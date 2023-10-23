interface checkKeywordProps{
    keywordList: string[],
    content: string
}

export const checkKeyword = ({keywordList, content}:checkKeywordProps):string[] | [] => {
    
    if(keywordList.length === 0){
        return []
    }else{

        const output = []

        for(let word of keywordList){
            if(content.includes(word)){
                output.push(word)
            }
        }
        //console.log("Found keywords:", output)
        return output;
    }
}

interface checkLocationProps{
    locationList: string[],
    location: string[],
}

export const checkLocation = ({locationList, location}:checkLocationProps):string[] | []  => {

    if(location.length === 0){
        //console.log("No location was found")
        return []
    }else{
        //assuming that there will only be a location in a given document
        if(locationList.includes(location[0])){
            //console.log("Found location: ", [location])
            return location
        }else{
            //console.log("Location is not part of location list")
            return []
        }
    }
}

interface attributeCheckProps{
    attributesList: {
        name?: string | undefined,
        value?: string | undefined
    }[],
    details:[{
        name: string,
        value: string
    }]
}

export const checkAttributes = ({attributesList, details}:attributeCheckProps):{name:string, value:string}[] | []  => {
    
    if(details.length < 0 || attributesList.length < 0){
        return []

    }else{

        const output = []

        for(let detail of details){
            for(let attribute of attributesList){
                //check if there is a similar name between the detail and attribute
                if(detail.name === attribute.name){
                    //check if there is a similar value between the detail and attribute
                    if(detail.value === attribute.value){
                        output.push({name: attribute.name, value: attribute.value})
                    }
                }
            }
        }
        return output;
    }
    
}