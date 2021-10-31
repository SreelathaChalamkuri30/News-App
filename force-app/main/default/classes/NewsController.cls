public with sharing class NewsController {

    @AuraEnabled
    public static Map<String, Object> NewsInformation(){
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('https://newsapi.org/v2/top-headlines?country=us&apiKey=feff07a3dc6749fcb3ba8e85d8617f71');
        httpRequest.setMethod('GET');

        Map<String,Object> newsData = new Map<String,object>();
        String strResponse = null; //to hold server data

        //Initiate a http request and return response

        try{
            Http http = new Http(); 
            //HttpResponse class is used to handle the Http Request and return the response
            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode() == 200){
                strResponse = httpResponse.getBody();
            }
            else{
                throw new CalloutException(httpResponse.getBody());
            }
        }
        catch(Exception ex){
            throw ex;
        }

        //We will check if the response coming in strResponse is blank or not

        if(!String.isBlank(strResponse)){
            newsData = (Map<String,object>)JSON.deserializeUntyped(strResponse);
        }
        if(!newsData.isEmpty()){
            return newsData;
        }
        else {
            return null;
        }




    }
    
}