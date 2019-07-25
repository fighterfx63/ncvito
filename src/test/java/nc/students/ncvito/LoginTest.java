package nc.students.ncvito;


        import org.junit.Test;
        import org.junit.runner.RunWith;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
        import org.springframework.boot.test.context.SpringBootTest;
        import org.springframework.test.context.junit4.SpringRunner;
        import org.springframework.test.web.servlet.MockMvc;

        import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
        import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
        import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
        import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
        import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
        import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
        import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class LoginTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void accessDeniedTest() throws Exception {
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
    public void correctLoginTest() throws Exception {
        this.mockMvc.perform(formLogin().user("admin").password("admin"))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/"));

    }

    @Test
    public void registrationTest() throws Exception {
        this.mockMvc.perform(post(("/registration")).with(csrf()).param("login", "testUser2").param("password", "testPassword2"))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/login"));
    }


}
