"use client";
import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { Briefcase, CalendarHeart, Clock, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function SideNavBar() {
  const menus = [
    {
      name: "Meeting type",
      path: "/dashboard/meeting-type",
      icon: <Briefcase />,
    },
    {
      name: "Scheduled Meeting",
      path: "/dashboard/scheduled-meeting",
      icon: <CalendarHeart />,
    },
    {
      name: "Availability",
      path: "/dashboard/availability",
      icon: <Clock />,
    },
  ];

  const path = usePathname();
  const [activePath, setActivePath] = useState(path);

  useEffect(() => {
    path && setActivePath(path);
  }, [path]);

  return (
    <aside className="p-5 py-14">
      <article className="flex justify-center">
        <Logo />
      </article>

      <Link href="/create-meeting">
        <Button className="flex items-center w-full gap-2 rounded-full mt-7">
          <Plus className="w-[19px]" />
          Create
        </Button>
      </Link>

      <article className="mt-5">
        {menus.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex items-center gap-2 p-2 mb-2 hover:bg-blue-100 rounded-sm ${
              activePath == menu.path && "text-primary bg-blue-100"
            }`}
          >
            <span>{menu.icon}</span>
            <h3 className="text-sm">{menu.name}</h3>
          </Link>
        ))}
      </article>
    </aside>
  );
}

export default SideNavBar;
