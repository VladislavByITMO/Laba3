package utils;

import dao.Entry;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@ManagedBean(name = "entryChecker")
@SessionScoped
public class EntryChecker {


    public boolean check(Entry entry) {
        Double x = entry.getX();
        Double y = entry.getY();
        Double r = entry.getR();

        return (x > 0) && (y >= 0) && (x <= (r/2) && (y < r)) ||
                (((x * x + y * y) <= r * r) && (y <= 0) && (x <= 0)) || ((y > (x / 2 - r / 2)) && (y <= 0) && (x > 0) && x <= r);


    }

}
