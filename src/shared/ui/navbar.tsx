import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Code,
} from "@nextui-org/react";
import { SunIcon } from "@nextui-org/shared-icons";
import { FaAlignJustify } from "react-icons/fa";

export function CustomNavbar() {
  return (
    <Navbar className="bg-bismark-100 rounded-md max-w-[1000px] m-auto max-h-[50px] fade-in">
      <NavbarBrand className="">
        <Code className="bg-bismark-300">Травмотология | Ортопедия</Code>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="gap-1 flex">
          <Button isIconOnly variant="flat">
            <SunIcon className="text-yellow-500 text-[24px]" />
          </Button>
          <Button isIconOnly color="default" variant="flat">
            <FaAlignJustify className="text-zinc-500 text-[24px]" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
