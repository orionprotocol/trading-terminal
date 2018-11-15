package ru.dev4j.model;

public class Pair {
    private String generalName;
    private String codeName;

    public Pair(String generalName, String codeName) {

        this.generalName = generalName;
        this.codeName = codeName;
    }

    public String getGeneralName() {
        return generalName;
    }

    public void setGeneralName(String generalName) {
        this.generalName = generalName;
    }

    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }
}
