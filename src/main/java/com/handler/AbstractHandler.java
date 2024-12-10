package com.handler;

import java.util.Map;
import org.json.JSONObject;

public abstract class AbstractHandler {

    // Abstract methods to be implemented by subclasses
    public abstract String doGet(Map<String,String>parameters) throws Exception;

    public abstract String doPost(Map<String,String>parameters, JSONObject payload) throws Exception;

    public abstract String doPut(Map<String,String>parameters, JSONObject payload) throws Exception;

    public abstract String doDelete(Map<String,String>parameters) throws Exception;
}
