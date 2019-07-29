package nc.students.ncvito;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.core.StringContains.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@TestPropertySource("/application-test.properties")
@Sql(value = {"/create..sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class LoginTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void accessDenied() throws Exception {
        this.mockMvc.perform(get("/announcements"))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("http://localhost/login"));

    }

    @Test
    public void badCredentials() throws Exception {
        this.mockMvc.perform((post("/login").param("user", "Alfred")))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    public void correctLogin() throws Exception {
        this.mockMvc.perform(formLogin().user("admin").password("admin"))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/"));

    }

    @Test
    public void registration() throws Exception {
        this.mockMvc.perform(post(("/registration")).with(csrf()).param("login", "testUser").param("password", "testPassword"))
                .andExpect(status().is2xxSuccessful());


    }

    @Test


    public void newUserTest() throws Exception {

        String login = "testUser";
        String password = "testPassword";

        this.mockMvc.perform(post(("/registration")).param("login", login).param("password", password).with(csrf()))
                .andDo(print())
                .andExpect(status().is2xxSuccessful());



        this.mockMvc.perform(post("/login").with(csrf()).param("username", login).param("password", password))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/"));

        this.mockMvc.perform(get("/announcements").with(user(login)))
                .andDo(print())
                .andExpect(content().string(containsString("announcement_1")));


    }
}



