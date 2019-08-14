package nc.students.ncvito;

import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.entity.Apartment;
import nc.students.ncvito.entity.Role;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.service.AnnouncementService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.hamcrest.core.Is.is;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestPropertySource("/application-test.properties")


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class AnnouncementsControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    AnnouncementService announcementService;

    @Before
    public void createObjects() {

        User user = new User();
        user.setLogin("admin");
        user.setPassword("admin");
        user.setEmail("email");
        user.setFirstName("Petya");
        user.setLastName("Petrov");
        user.setPhone("123");
        user.setRole(Collections.singleton(Role.USER));

        Apartment apartment = new Apartment();
        apartment.setAddress("qwe");
        apartment.setFloor(1);
        apartment.setRoomCount(1);
        apartment.setSquare(1);

        Announcement announcement = new Announcement();
        announcement.setAuthor(user);
        announcement.setApartment(apartment);
        announcement.setSale(true);
        announcement.setPrice(150);
        announcement.setDescription("announcement_1");
        announcementService.create(announcement);
    }

    @WithMockUser(username = "admin")
    @Test
    public void findAll() throws Exception {
        this.mockMvc.perform(get("/announcements"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.content[0].description", is("announcement_1")));
    }

    @WithMockUser(username = "admin")
    @Test
    public void getByID() throws Exception {
        this.mockMvc.perform(get("/announcements/1"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.description", is("announcement_1")));
    }

    @WithMockUser(username = "admin")
    @Test
    public void add() throws Exception {

        User user1 = new User();
        user1.setLogin("qwe");
        user1.setPassword("qwe");
        user1.setRole(Collections.singleton(Role.USER));

        Apartment apartment1 = new Apartment();
        apartment1.setAddress("qwe");
        apartment1.setFloor(1);
        apartment1.setRoomCount(1);
        apartment1.setSquare(1);

        Announcement announcement1 = new Announcement();
        announcement1.setAuthor(user1);
        announcement1.setApartment(apartment1);
        announcement1.setSale(true);
        announcement1.setPrice(150);
        announcement1.setDescription("test");

        announcementService.create(announcement1);

        this.mockMvc.perform(get("/announcements"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.content[0].author.login", is("admin")));
    }
}

