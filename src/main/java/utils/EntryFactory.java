package utils;

import beans.EntryBean;
import dao.Entry;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

@ManagedBean(name = "entryFactory")
@ApplicationScoped
public class EntryFactory {

    public Entry buildEntry(EntryBean bean) {
        Entry res = new Entry();
        String xx = bean.getX().toString();
        String yy = bean.getY().toString();
        String rr = bean.getR().toString();

        double scale = Math.pow(10, 4);
        Double x = Math.ceil(Double.parseDouble(xx) * scale) / scale;
        Double y = Math.ceil(Double.parseDouble(yy) * scale) / scale;
        Double r = Math.ceil(Double.parseDouble(rr) * scale) / scale;

        res.setX(x);
        res.setY(y);
        res.setR(r);
        res.setStatus(bean.getStatus());
        return res;
    }

}
