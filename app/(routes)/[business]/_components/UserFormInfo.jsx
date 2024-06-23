import { Input } from "@/components/ui/input";
import React from "react";

function UserFormInfo({ setUserInfo, userInfo }) {
  return (
    <article className="p-4 px-8 flex flex-col gap-2">
      <h2 className="font-bold text-xl">Enter Details</h2>
      <article>
        <h2>Name *</h2>
        <Input
          value={userInfo.name}
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              name: e.target.value,
            })
          }
        />
      </article>
      <article>
        <h2>Email *</h2>
        <Input
          value={userInfo.email}
          type="email"
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              email: e.target.value,
            })
          }
        />
      </article>
      <article>
        <h2>Share any Note </h2>
        <Input
          value={userInfo.note}
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              note: e.target.value,
            })
          }
        />
      </article>
      <article>
        <h2 className="text-xs text-gray-400">
          By Proceeding, you confirm that you read and agree Quick Meet Terms
          and Condition
        </h2>
      </article>
    </article>
  );
}

export default UserFormInfo;
