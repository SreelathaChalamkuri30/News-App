import { LightningElement, track } from 'lwc';
import  newsInfo  from '@salesforce/apex/NewsController.NewsInformation';

export default class newsInformation extends LightningElement {
     
    @track result =[]
    @track selectedNames = {};
    @track isModalOpen = false

    get modalBackdropClass(){
        return this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop"
    }

    get modelClass(){
        return this.isModalOpen ? "slds-modal slds-fade-in-open" : "slds-modal"
    }

    //to fetch the data
    connectedCallback(){
        this.fetchNews();//create a method called fetchNews
    }

    fetchNews(){
        //promise always sends a response that is catched by the then block
        newsInfo().then(response=>{
            console.log(response);
            /*the data is in the console, we want to format this data as in html we are going to loop this data 
            and for looping we need an id, We need a unique property for looping as LWC needs a unique key parameter for Virtual DOM    */
            this.formatNewsData(response.articles);
        }).catch(error =>{
            console.log(error);
        })   
    }

    /* The Data we are receiving is in this format, as above we will be sending response.articles to the formatNewData 

    articles": [
-{
-"source": {
"id": null,
"name": "profootballrumors.com"
},
"author": null,
"title": "Cardinals DE JJ Watt Likely To Undergo Season-Ending Surgery - profootballrumors.com",
"description": "It sounds like J.J. Watt's shoulder injury will likely cost him the rest of the season. The Cardinals pass rusher &hellip;",
"url": "https://www.profootballrumors.com/2021/10/cardinals-de-j-j-watt-likely-to-undergo-season-ending-surgery",
"urlToImage": "https://cdn.profootballrumors.com/files/2021/10/USATSI_17022909-1024x723.jpg",
"publishedAt": "2021-10-28T03:39:00Z",
"content": "It sounds like J.J. Watt‘s shoulder injury will likely cost him the rest of the season. The Cardinals pass rusher is likely to undergo season-ending shoulder surgery, according to ESPN’s Adam Schefte… [+1887 chars]"
},
 */

    formatNewsData(res){
        this.result = res.map((item,index)=>{
            let id = 'new_${index+1}' ; //news1,news2,news3
            let date = new Date(item.publishedAt).toDateString();
            let name = item.source.name;
            return {...item, id:id, name:name,date:date}
        })
    }

    showModal(event){
        /*to fetch the data when clicked on Read More,
          for each item if the id value matches the id in the item
          then item is stored in selectedNames which is intialized as an empty object*/
       let id = event.target.dataset.item;
       this.result.forEach(item =>{
           if(item.id === id){
               this.selectedNames ={...item} 
           }
       })
       this.isModalOpen =true;
    }

    closeModal(){
        this.isModalOpen =false;
    }
}