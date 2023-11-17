import axios from 'axios';
import grapesjs from 'grapesjs';
import swal from 'sweetalert';
import { baseURL } from '../../../../Services/index';
// import {h5poptions} from './h5p-constants'

const getHeaders = () => {
  var accessToken
  if(localStorage.getItem('accessToken')){
      accessToken = localStorage.getItem('accessToken')
  } 
  return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

var h5poptions = [{name:'--Select--', id:'---'}];

var button_text = 'Take this interactive quiz after you complete the module.'; 

export const fetchH5PContent = async () => {
 try {const response = await axios.get(baseURL+`/h5p`, getHeaders())
  if(response) {
    if(response.status == 200) {

        var data = response.data
        let newArray = [...h5poptions];

        data.forEach((res)=>{
            let checkList = newArray.findIndex(obj=> obj.id == res.contentId);
            if (checkList == -1) {
              newArray.push({ id: res.contentId, name: res.title})
            } else {
            }
        })

        newArray.map((obj, i)=>{
          h5poptions[i] = newArray[i]
        })
            
      } else {
        // error message
        swal({
          title: "Error!",
          text: "Unable to get H5P",
          icon: "error",
          timer: 6000
        });
    }
  }
  } catch (err) {
    if (err?.response?.data?.code == 401){
      swal({
        title: "Error!",
        text: err?.response?.message,
        icon: "error",
        timer: 6000
      });
    }
  }
}


grapesjs.plugins.add('h5p-select-block', function(editor, options){

    options = options || {}


    addH5PSelectComponent();
    addH5PSelectBlock();

    function addH5PSelectComponent(){
        editor.DomComponents.addType('h5p-select-block', {
            //  this checks all components and assigns correct type to the component based on the condition
            isComponent: function(el){                
                if (typeof el.hasAttribute == "function" && el.hasAttribute("datah5pblock")){
                    return {type: 'h5p-select-block'}      
                    }
                },
            model: {
              defaults: {
                traits() {
                  const result = [];
                  
                    // Example of some logic                   
                      result.push({
                        type: 'select', // Type of the trait
                        label: 'H5P Type', // The label you will see in Settings
                        name: 'h5pid', // The name of the attribute/property to use on component
                        options: h5poptions,
                        
                      }); 
                    return result;
                  },
              },
            //   this is initiated when there is a change in the value of h5pid attribute 
              init() {
                this.on('change:attributes:h5pid', this.handleTypeChange);
              },
          
              handleTypeChange() {
                // console.log('Input type changed to: ', this.getAttributes()); // provides all the attributes 
                // const block_H5PId = this.getTrait('h5pid').changed.value - provides new value of h5pid
                const   id    =   editor.getSelected().id;
                const   h5pid =   editor.getSelected().h5pid;
                const   newAttributes    =   {
                    id:     id,
                    h5pid:  h5pid,
                    name:   'h5p'
                } 
                
                // const comp  = editor.DomComponents.getComponent('h5p-select-block')
                const component  = editor.getSelected()
                
              },

            },
            
        });
    }

    function addH5PSelectBlock(){
      
        editor.BlockManager.add("h5p-select-block", {
            
            attributes: {class: "fa fa-code" },
            label: "H5P",
            // content will have the array of H5P components as options 
            content: `<section style="padding:15px; margin:auto; width: auto; display:flex; justify-content: center; ">
                        <button datah5pblock name='h5p' class="h5p" style=" 
                          display:inline-block;
                          margin:auto; 
                          background-color:#4ba0f0; 
                          padding:15px 32px;  
                          border: none;
                          color: white;
                          border-radius: 4px;
                           text-align:center;"
                          >
                          ${button_text}
                        </button>
                      </section>`,
        });
    }

})
