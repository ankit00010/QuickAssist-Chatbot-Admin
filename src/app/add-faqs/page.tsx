import AddFaqContainer from "@/container/add-faq-container";
import { FunctionComponent } from "react";

interface AddFaqsProps {
    
}
 
const AddBlog: FunctionComponent<AddFaqsProps> = () => {
    return ( <main>
        <AddFaqContainer/>
    </main> );
}
 
export default AddBlog;