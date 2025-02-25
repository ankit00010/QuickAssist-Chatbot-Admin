import EditContainer from "@/container/edit-container";

interface EditFaqsProps {
  params: { id: string };
}

const EditFaqs = ({ params }: EditFaqsProps) => {
  return <EditContainer id={params.id} />; 
};

export default EditFaqs;
