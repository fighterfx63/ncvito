package nc.students.ncvito.service;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class SearchCriteria {

    private String key;
    private String operation;
    private Object value;

    SearchCriteria(String key, String operation, Object value) {
        this.key = key;
        this.operation = operation;
        this.value = value;
    }
}
