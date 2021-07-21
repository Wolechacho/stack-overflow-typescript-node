export function formatTags(tags:Array<string>):string{
    let tagBuilder:string  = "";
    for (const tag of tags) {
        tagBuilder += tag + ','
    }
    
    return tagBuilder.slice(0,tagBuilder.length-1);
}