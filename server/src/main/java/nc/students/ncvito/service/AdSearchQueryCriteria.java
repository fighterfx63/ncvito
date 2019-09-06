package nc.students.ncvito.service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.function.Consumer;


public class AdSearchQueryCriteria implements Consumer<SearchCriteria> {

    private Predicate predicate;
    private CriteriaBuilder builder;
    private Root r;

    @Override
    public void accept(SearchCriteria param) {
        String operation = param.getOperation();

        if (operation.equalsIgnoreCase(">")) {
            predicate = builder.and(
                    predicate,
                    builder.greaterThan(r.get(param.getKey()), param.getValue().toString())
            );
        }
        else if (operation.equalsIgnoreCase("<")) {
            predicate = builder.and(
                    predicate,
                    builder.lessThan(r.get(param.getKey()), param.getValue().toString())
            );
        }
        else if (operation.equalsIgnoreCase(":")) {

            if (r.get(param.getKey()).getJavaType() == String.class) {
                predicate = builder.and(
                        predicate,
                        builder.like(r.get(param.getKey()), "%" + param.getValue() + "%")
                );
            } else {
                predicate = builder.and(
                        predicate,
                        builder.equal(r.get(param.getKey()), param.getValue())
                );
            }
        }
        else if (operation.equalsIgnoreCase("':")) {
            System.out.println("array is " + param.getValue());
            int [] count = (int[])param.getValue();
            int moreThan = 0;
            if (param.getKey().equals("roomCount")) {
                moreThan = 5;
            } else if (param.getKey().equals("floor")) {
                moreThan = 10;
            }
            Predicate tempPredicate = builder.conjunction();

            for (int i = 0; i < count.length; i++) {

                if (count[i] == -1) {

                    if (i == 0) {
                        tempPredicate = builder.and(
                                tempPredicate,
                                builder.greaterThan(r.get(param.getKey()), moreThan)
                        );
                    } else {
                        tempPredicate = builder.or(
                                tempPredicate,
                                builder.greaterThan(r.get(param.getKey()), moreThan)
                        );
                    }

                } else {

                    if (i == 0) {
                        tempPredicate = builder.and(
                                tempPredicate,
                                builder.equal(r.get(param.getKey()), count[i])
                        );
                    } else {
                        tempPredicate = builder.or(
                                tempPredicate,
                                builder.equal(r.get(param.getKey()), count[i])
                        );
                    }
                }
            }

            predicate = builder.and(predicate, tempPredicate);
        }
    }

    public Predicate getPredicate() {
        return this.predicate;
    }

    AdSearchQueryCriteria(Predicate predicate, CriteriaBuilder builder, Root r) {
        this.predicate = predicate;
        this.builder = builder;
        this.r = r;
    }
}
