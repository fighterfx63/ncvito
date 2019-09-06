package nc.students.ncvito.service;

import nc.students.ncvito.entity.*;
import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.entity.Favorites;
import nc.students.ncvito.entity.Status;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.repo.AnnouncementRepository;
import nc.students.ncvito.repo.FavoritesRepository;
import nc.students.ncvito.repo.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.util.Collections;
import java.util.List;


@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;
    private final FavoritesRepository favoritesRepository;


    public AnnouncementService(AnnouncementRepository announcementRepository, UserRepository userRepository, FavoritesRepository favoritesRepository) {
        this.announcementRepository = announcementRepository;
        this.userRepository = userRepository;
        this.favoritesRepository = favoritesRepository;
    }

    public Page<Announcement> findAll(Pageable pageable) {
        return announcementRepository.findByOrderByCreationDateDesc(pageable);
    }

    public Announcement findById(long id) {
        return announcementRepository.findById(id);
    }

    public void delete(Announcement announcement, Authentication authentication) {

        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));

        if (user.getId() == announcement.getAuthor().getId() || user.getRole().contains(Role.ADMIN) || user.getRole().contains(Role.MODERATOR)) {
            List<Favorites> favoritesList = favoritesRepository.findByAnnouncement(announcement);
            for (Favorites favorite : favoritesList) {
                favoritesRepository.delete(favorite);
            }
            announcementRepository.delete(announcement);
        }


    }


    public Announcement update(Announcement announcement, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));

        if (user.getId() == announcement.getAuthor().getId() || user.getRole().contains(Role.ADMIN) || user.getRole().contains(Role.MODERATOR)) {
            return announcementRepository.save(announcement);
        } else return null;
    }

    public Announcement create(Announcement announcement, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        announcement.setAuthor(user);
        announcement.setStatus(Collections.singleton(Status.NOT_MODERATED));
        return announcementRepository.save(announcement);
    }

    public void addToFavorites(Announcement announcement, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        Favorites favorites = new Favorites();
        favorites.setAnnouncement(announcement);
        favorites.setUser(user);
        favoritesRepository.save(favorites);


    }

    public void deleteFavorites(Announcement announcement, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        Favorites favorites = favoritesRepository.findByAnnouncementAndUser(announcement, user);
        favoritesRepository.delete(favorites);

    }

    public List<Announcement> getAllFavoritesByUser(Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        List<Announcement> announcementList = new ArrayList<>();
        List<Favorites> favoritesList = favoritesRepository.findAllByUser(user);
        for (Favorites favorites : favoritesList) {
            announcementList.add(favorites.getAnnouncement());
        }

        return announcementList;

    }

    @PersistenceContext
    private EntityManager entityManager;

    public Page<Announcement> findByFilter(String filter) {
        List<SearchCriteria> searchCriteriaList = makeSearchCriteriaList(filter); // make list of SearchCriteria

        List<Announcement> result = getListOfAnnouncements(searchCriteriaList); // make list of Announcements

        int page = ((int []) searchCriteriaList.get(searchCriteriaList.size() - 1).getValue())[0];
        int size = ((int []) searchCriteriaList.get(searchCriteriaList.size() - 1).getValue())[1];

        int start = (int) new PageRequest(page, size).getOffset();
        int end = (start + new PageRequest(page, size).getPageSize()) > result.size() ? result.size() : (start + new PageRequest(page, size).getPageSize());

        return new PageImpl<Announcement>(result.subList(start, end), new PageRequest(page, size), result.size());
    }

    public List<SearchCriteria> makeSearchCriteriaList(String filter) {
        List<SearchCriteria> resultList = new ArrayList<>();

        String[] strCriteria = filter.split("@");
        String[] strCriteriaData;
        SearchCriteria searchCriteria;
        int [] pageStartEnd = new int[] {0, 10}; // by default
        int[] intNumbers;

        for (int i = 0; i < strCriteria.length; i++) {
            strCriteriaData = strCriteria[i].split("_");

            switch (strCriteriaData[0]) {
                case "address": // string
                case "sortBy":
                    searchCriteria = new SearchCriteria(strCriteriaData[0], strCriteriaData[1], strCriteriaData[2]);
                    resultList.add(searchCriteria);
                    break;

                case "price": // long
                    searchCriteria = new SearchCriteria(strCriteriaData[0], strCriteriaData[1], Long.parseLong(strCriteriaData[2]));
                    resultList.add(searchCriteria);
                    break;

                case "square": // double
                    searchCriteria = new SearchCriteria(strCriteriaData[0], strCriteriaData[1], Double.parseDouble(strCriteriaData[2]));
                    resultList.add(searchCriteria);
                    break;

                case "roomCount": // array/integer
                case "floor":
                    if (strCriteriaData[2].contains(",")) { // then we have an array as a value
                        intNumbers = makeIntArrayFromStringArray(
                                strCriteriaData[2].split(",")
                        );
                        searchCriteria = new SearchCriteria(strCriteriaData[0], strCriteriaData[1], intNumbers);
                    } else { // one integer value (anyway, we put it in array)
                        intNumbers = new int[]{Integer.parseInt(strCriteriaData[2])};
                        searchCriteria = new SearchCriteria(strCriteriaData[0], strCriteriaData[1], intNumbers);
                    }
                    resultList.add(searchCriteria);
                    break;

                case "page": // page parameters
                    pageStartEnd[0] = Integer.parseInt(strCriteriaData[1]);
                    pageStartEnd[1] = Integer.parseInt(strCriteriaData[2]);
            }
        }

        resultList.add(new SearchCriteria("page", "page", pageStartEnd)); // add pageable by last element in the List
        return resultList;
    }

    private int[] makeIntArrayFromStringArray(String[] strArray) {
        int[] intNumbers = new int[strArray.length];
        for (int i = 0; i < intNumbers.length; i++) {
            intNumbers[i] = Integer.parseInt(strArray[i]);
        }
        return intNumbers;
    }

    public List<Announcement> getListOfAnnouncements(List<SearchCriteria> searchCriteriaList) {
        List<SearchCriteria> adList = new ArrayList<>();
        List<SearchCriteria> apartList = new ArrayList<>();

        SearchCriteria sortByCriteria = new SearchCriteria("sortBy", "desc", "creationDate"); // sort by default

        for (int i = 0; i < searchCriteriaList.size() - 1; i++) {
            if (searchCriteriaList.get(i).getKey().equals("price")) {
                adList.add(searchCriteriaList.get(i));
            }
            else if (searchCriteriaList.get(i).getKey().equals("sortBy")) {
                sortByCriteria = searchCriteriaList.get(i);
            }
            else {
                apartList.add(searchCriteriaList.get(i));
            }
        }

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();

        // Query predicate
        CriteriaQuery<Announcement> query = builder.createQuery(Announcement.class);
        Root announcementRoot = query.from(Announcement.class);
        Predicate adPredicate = builder.conjunction();
        AdSearchQueryCriteria adSearch = new AdSearchQueryCriteria(adPredicate, builder, announcementRoot);
        adList.stream().forEach(adSearch);
        adPredicate = adSearch.getPredicate();

        // Subquery predicate
        Subquery<Apartment> subQuery = query.subquery(Apartment.class);
        Root apartmentRoot = subQuery.from(Apartment.class);
        Predicate apartPredicate = builder.conjunction();
        AdSearchQueryCriteria apartSearch = new AdSearchQueryCriteria(apartPredicate, builder, apartmentRoot);
        apartList.stream().forEach(apartSearch);
        apartPredicate = apartSearch.getPredicate();
        subQuery.select(apartmentRoot).where(apartPredicate);

        // Stick subQuery to the query
        query.where(builder.and(adPredicate, builder.in(announcementRoot.get("apartment")).value(subQuery)));

        // SortBy Criteria Processing
        if (sortByCriteria.getValue().toString().equals("creationDate") || sortByCriteria.getValue().toString().equals("price")) { // if sort by Announcement class fields
            if (sortByCriteria.getOperation().equals("asc")) {
                query.orderBy(builder.asc(announcementRoot.get(sortByCriteria.getValue().toString())));
            } else {
                query.orderBy(builder.desc(announcementRoot.get(sortByCriteria.getValue().toString())));
            }
        } else { // if sort by Apartment class fields
            if (sortByCriteria.getOperation().equals("asc")) {
                query.orderBy(builder.asc(announcementRoot.get(Announcement_.apartment).get(sortByCriteria.getValue().toString())));
            } else {
                query.orderBy(builder.desc(announcementRoot.get(Announcement_.apartment).get(sortByCriteria.getValue().toString())));
            }
        }

        List<Announcement> result = entityManager.createQuery(query).getResultList();
        return result;
    }
    
    public Announcement checkIfTheAdIsFavorite(Announcement announcement, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        Favorites fav = favoritesRepository.findByAnnouncementAndUser(announcement, user);
        return fav.getAnnouncement();
    }

}

    public Page<Announcement> findAllByAuthor(Pageable pageable, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        return announcementRepository.findAllByAuthor(user, pageable);
    }

    public Page<Announcement> getFavoriteAds(Pageable pageable, Authentication authentication){
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        List<Announcement> announcementList=new ArrayList<>();
        List<Favorites> favoritesList= favoritesRepository.findAllByUser(user);
        for (Favorites favorites: favoritesList) {
            announcementList.add(favorites.getAnnouncement());
        }
        Page<Announcement> page = new PageImpl<>(announcementList, pageable, announcementList.size());
        return page;
    }

}

