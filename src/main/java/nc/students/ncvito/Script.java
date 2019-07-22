package nc.students.ncvito;

import java.io.FileNotFoundException;
import java.io.File;
import java.util.Scanner;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Random;

public class Script {

    private static String url;
    private static String user;
    private static String password;


    public static void main(String[] args) throws FileNotFoundException {
        defineConnectionProperties();
        Connection con = connect();

        concateAllTables(con);

        int tableRowsCount = 15;
        fillTables(con, tableRowsCount);

        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void defineConnectionProperties() throws FileNotFoundException {
        File properties = new File(System.getProperty("user.dir") + "/src/main/resources/application.properties");
        Scanner scan = new Scanner(properties);
        String currentRow;
        while (scan.hasNextLine()) {
            currentRow = scan.nextLine();
            if (currentRow.substring(0, currentRow.indexOf("=")).equals("spring.datasource.url")) {
                url = currentRow.substring(currentRow.indexOf("=") + 1, currentRow.length());
            } else if (currentRow.substring(0, currentRow.indexOf("=")).equals("spring.datasource.username")) {
                user = currentRow.substring(currentRow.indexOf("=") + 1, currentRow.length());
            } else if (currentRow.substring(0, currentRow.indexOf("=")).equals("spring.datasource.password")) {
                password = currentRow.substring(currentRow.indexOf("=") + 1, currentRow.length());
            }
        }
        scan.close();
    }

    public static Connection connect() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url, user, password);
            System.out.println("Установлена связь с PostgreSQL-сервером.");
        } catch (SQLException e) {
            System.out.println("ОШИБКА! Не могу подключиться к базе данных. Обратите внимание на 12 по 16 строки кода.");
            System.out.println(e.getMessage());
        }
        return conn;
    }

    public static void concateAllTables(Connection cn) {
        System.out.println("Произвожу очистку таблиц: favorites, announcement_status, user_role, announcement, apartment, users ...");
        String[] arr = {"favorites", "announcement_status", "user_role", "announcement", "apartment", "users"};
        String query;
        for (int i = 0; i < arr.length; i++) {
            query = "TRUNCATE TABLE  " + arr[i] + " CASCADE;";

            try (PreparedStatement pstmt = cn.prepareStatement(query,
                    Statement.RETURN_GENERATED_KEYS)) {

                pstmt.execute();

            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
                break;
            }
        }
    }

    public static void fillTables(Connection cn, int userCount) {
        Random rnd = new Random();

        insertUsers(cn, userCount);
        insertUserRoles(cn, userCount);
        insertApartments(cn, userCount);
        insertAnnouncements(cn, userCount);
        insertAnnouncementStatus(cn, userCount);
        insertFavourites(cn, userCount);
    }

    public static void insertUsers(Connection cn, int count) {
        System.out.println("Заполняю таблицу users ...");
        Random rnd = new Random();

        String first_name;
        String last_name;
        String email;
        String pas;
        String phone;
        String login;
        String ban_expired;
        String ban_reason;

        boolean is_banned;

        String query;
        for (int i = 0; i < count; i++) {
            first_name = genFname();
            last_name = genLname();
            email = "email_" + rnd.nextInt(1000);
            pas = "pass_" + rnd.nextInt(1000) + 1;
            phone = genPhone();
            login = "login_" + rnd.nextInt(1000) + 1;
            is_banned = genBoolean(rnd.nextInt(2));
            if (is_banned) { // если юзер забанен - заполняем поля ban_expired и ban_reason
                ban_expired = genTimeStamp();
                ban_reason = "Reason_" + rnd.nextInt(100) + 1;
                query = "INSERT INTO users (id, first_name, last_name, email, password, phone, login, ban_expired, ban_reason)"
                        + " VALUES (" + (i + 1) + ", '" + first_name + "', '" + last_name + "', '" + email + "', '" + pas + "', '" + phone + "', '" + login + "', '" + ban_expired + "', '" + ban_reason + "')";
            } else { // если юзер "на свободе" - поля ban_expired и ban_reason НЕ заполняются (я предполагаю, что они == NULL в таком случае)
                query = "INSERT INTO users (id, first_name, last_name, email, password, phone, login)"
                        + " VALUES (" + (i + 1) + ", '" + first_name + "', '" + last_name + "', '" + email + "', '" + pas + "', '" + phone + "', '" + login + "')";
            }

            try (PreparedStatement pstmt = cn.prepareStatement(query,
                    Statement.RETURN_GENERATED_KEYS)) {

                pstmt.execute();

            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
                break;
            }
        }
    }

    public static void insertUserRoles(Connection cn, int count) {
        System.out.println("Заполняю таблицу user_role ...");
        Random rnd = new Random();

        String role;

        String query;
        for (int i = 0; i < count; i++) {
            role = genUserRole();
            query = "INSERT INTO user_role (user_id, role)"
                    + " VALUES (" + (i + 1) + ", '" + role + "')";

            try (PreparedStatement pstmt = cn.prepareStatement(query,
                    Statement.RETURN_GENERATED_KEYS)) {

                pstmt.execute();

            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
                break;
            }
        }
    }

    public static void insertApartments(Connection cn, int count) {
        System.out.println("Заполняю таблицу apartment ...");
        Random rnd = new Random();

        String address;
        String square;
        int room_count;
        int floor;

        String query;
        for (int i = 0; i < count; i++) {
            address = genFname();
            room_count = rnd.nextInt(5) + 1;
            square = (room_count * (rnd.nextInt(26) + 20)) + "." + rnd.nextInt(100);
            floor = rnd.nextInt(10) + 1;

            query = "INSERT INTO apartment (id, address, floor, room_count, square)"
                    + " VALUES (" + (i + 1) + ", '" + address + "', " + floor + ", " + room_count + ", " + square + ")";

            try (PreparedStatement pstmt = cn.prepareStatement(query,
                    Statement.RETURN_GENERATED_KEYS)) {

                pstmt.execute();

            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
                break;
            }
        }
    }

    public static void insertAnnouncements(Connection cn, int count) {
        System.out.println("Заполняю таблицу announcement ...");
        Random rnd = new Random();

        int user_id;
        int apartment_id;
        int price;
        String creation_date;
        boolean is_sale;
        String description;

        String query;
        for (int i = 0; i < count; i++) {
            user_id = rnd.nextInt(count) + 1;
            apartment_id = rnd.nextInt(count) + 1;
            price = (rnd.nextInt(5) + 1) * 1200000 + rnd.nextInt(1000000);
            creation_date = genAdCreationDate();
            is_sale = genBoolean(rnd.nextInt(2));
            description = "Description_" + rnd.nextInt(1000);

            query = "INSERT INTO announcement (id, user_id, apartment_id, price, creation_date, is_sale, description)"
                    + " VALUES (" + (i + 1) + ", " + user_id + ", " + apartment_id + ", " + price + ", '" + creation_date + "', " + is_sale + ", '" + description + "')";

            try (PreparedStatement pstmt = cn.prepareStatement(query,
                    Statement.RETURN_GENERATED_KEYS)) {

                pstmt.execute();

            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
                break;
            }
        }
    }

    public static void insertFavourites(Connection cn, int count) {
        System.out.println("Заполняю таблицу favorites ...");
        Random rnd = new Random();

        int user_id;
        int announcement_id;

        String query;
        for (int i = 0; i < count; i++) {
            user_id = rnd.nextInt(10) + 1;
            announcement_id = rnd.nextInt(10) + 1;
            query = "INSERT INTO favorites (id, user_id, announcement_id)"
                    + " VALUES (" + (i + 1) + ", " + user_id + ", " + announcement_id + ")";

            try (PreparedStatement pstmt = cn.prepareStatement(query,
                    Statement.RETURN_GENERATED_KEYS)) {

                pstmt.execute();

            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
                break;
            }
        }
    }

    public static void insertAnnouncementStatus(Connection cn, int count) {
        System.out.println("Заполняю таблицу announcement_status ...");
        Random rnd = new Random();

        String status;

        String query;
        for (int i = 0; i < count; i++) {
            status = genAnStatus();
            query = "INSERT INTO announcement_status (announcement_id, status)"
                    + " VALUES (" + (i + 1) + ", '" + status + "')";

            try (PreparedStatement pstmt = cn.prepareStatement(query,
                    Statement.RETURN_GENERATED_KEYS)) {

                pstmt.execute();

            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
                break;
            }
        }
    }

    private static String genFname() {
        Random rnd = new Random();
        String[] arr = {"Лера", "Пётр", "Вера", "Игорь", "Степан", "Алиса", "Александр", "Ксения", "Павел", "Лилия", "Иван", "Диана", "Егор"};
        return arr[rnd.nextInt(arr.length)];
    }

    private static String genLname() {
        Random rnd = new Random();
        String[] arr = {"Дашков(а)", "Петров(а)", "Ялдайкин(а)", "Макаревич", "Сегин(а)", "Козлов(а)", "Абдулин(а)", "Губеев(а)", "Сергеев(а)", "Иванов(а)", "Попов(а)", "Ясенчук", "Смирнов(а)"};
        return arr[rnd.nextInt(arr.length)];
    }

    private static String genPhone() {
        Random rnd = new Random();
        return "8-917-" + (rnd.nextInt(900) + 100) + "-" + (rnd.nextInt(90) + 10) + "-" + (rnd.nextInt(90) + 10);
    }

    private static String genUserRole() {
        Random rnd = new Random();
        String[] arr = {"anonymous", "banned", "user", "moderator", "admin"};
        return arr[rnd.nextInt(arr.length)];
    }

    private static boolean genBoolean(int bool) {
        if (bool == 1) {
            return true;
        } else {
            return false;
        }
    }

    private static String genTimeStamp() {
        Random rnd = new Random();
        return (rnd.nextInt(3) + 2019) + "-10-19 10:23:54";
    }

    private static String genAdCreationDate() {
        Random rnd = new Random();
        return (rnd.nextInt(2) + 2019) + "-" + (rnd.nextInt(12) + 1) + "-" + (rnd.nextInt(29) + 1) + " 10:23:54";
    }

    private static String genAnStatus() {
        Random rnd = new Random();
        String[] arr = {"not_moderated", "published", "blocked"};
        return arr[rnd.nextInt(arr.length)];
    }

}
