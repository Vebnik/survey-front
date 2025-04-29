import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Code,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { SunIcon } from "@nextui-org/shared-icons";
import { FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useModals } from "@/store/modals.store";

export function CustomNavbar() {
  const modals = useModals();

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
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly color="default" variant="flat">
                <FaAlignJustify className="text-zinc-500 text-[24px]" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="login"
                onPress={() => modals.setIsOpen("login", true)}
                isDisabled
              >
                Войти
              </DropdownItem>
              <DropdownItem key="stats" as={Link} href="/statistic">
                Статистика
              </DropdownItem>
              <DropdownItem key="genearl" as={Link} href="/">
                Главная
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
