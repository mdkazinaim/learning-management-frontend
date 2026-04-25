import Header from "@/common/Header";
import FAQSection from "./Components/FAQSection";
import ContactForm from "./Components/ContactForm";



const Support = () => {

  return (
    <div className="space-y-6">
      <Header title="Support" description="Get help and access resources"/>
      {/* <SupportOptions/> */}
      <FAQSection/>
      <ContactForm/>
    </div>
  );
};

export default Support;