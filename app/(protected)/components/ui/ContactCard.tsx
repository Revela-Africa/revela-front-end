import { MessagesSquare, Phone, User } from "lucide-react";

const ContactCard = () => {
  return (
    <div className="bg-white flex gap-x-4 items-center p-5 rounded-[12px]">
      <span className="border-[#E8A02040]  bg-[#F5F2EC] border p-3 rounded-full ">
        <User size={20} color="#D4900A" />
      </span>

      <div>
        <p className="text-(--ink-secondary) font-bold text-sm">
          Revela Support
        </p>
        <p className="text-[#6A6A6A] text-xs">Available 8AM–8PM daily</p>
      </div>

      <div className="ml-auto flex gap-x-3">
        <span className="  bg-[#F5F2EC]  p-3 rounded-[8px] ">
          <Phone size={20} color="#D4900A" />
        </span>
        <span className="  bg-[#F5F2EC]  p-3 rounded-[8px] ">
          <MessagesSquare size={20} color="#D4900A" />
        </span>
      </div>
    </div>
  );
};

export default ContactCard;
