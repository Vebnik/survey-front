import { Button } from "@nextui-org/react";
import { FaTelegram, FaWhatsapp, FaViber } from "react-icons/fa";

export function CustomFooter() {
  return (
    <footer className="bg-bismark-50 max-w-[1000px] w-full m-auto flex items-center justify-end rounded-md fade-in">
      <div className="flex gap-1 p-1">
        <Button isIconOnly color="default" size="sm" variant="flat">
          <FaViber className=" text-violet-500 text-[20px]" />
        </Button>
        <Button isIconOnly size="sm" variant="flat">
          <FaWhatsapp className="text-green-600 text-[20px]" />
        </Button>
        <Button isIconOnly color="default" size="sm" variant="flat">
          <FaTelegram className="text-blue-600 text-[20px]" />
        </Button>
      </div>
    </footer>
  );
}
