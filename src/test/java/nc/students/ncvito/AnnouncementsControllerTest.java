package nc.students.ncvito;

import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.entity.Apartment;
import nc.students.ncvito.entity.Role;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.service.AnnouncementService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.hamcrest.core.StringContains.containsString;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestPropertySource("/application-test.properties")

@WithUserDetails("admin")
@Sql(value = {"/create..sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class AnnouncementsControllerTest {


    @Autowired
    private AnnouncementService announcementService;
    @Autowired
    MockMvc mockMvc;

    @Test
    public void findAll() throws Exception {

        this.mockMvc.perform(get("/announcements"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string(containsString("announcement_1")));

    }

    @Test
    public void getByID() throws Exception {
        this.mockMvc.perform(get("/announcements/1"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string(containsString("announcement_1")));
    }

    @Test
    public void add() throws Exception {

        User user = new User();

        user.setLogin("qwe");
        user.setPassword("qwe");
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
        announcement.setDescription("test");

        announcementService.create(announcement);

        this.mockMvc.perform(get("/announcements"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string(containsString(user.getLogin())));
    }
}

