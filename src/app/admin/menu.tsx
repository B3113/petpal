import React from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";

type Props = {
  onSelectPage: (page: string) => void;
};

export default function Menu({ onSelectPage }: Props) {
  return (
    <div className="flex h-screen w-48 flex-col items-center bg-gray-100 p-4 py-10">
      <div className="mb-10 cursor-default text-2xl text-black">PetPal</div>
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <Button
              className="flex w-full items-center hover:opacity-70"
              variant="light"
              onClick={() => onSelectPage("Pet_manage")}
            >
              <Icon className="h-4" icon="line-md:home-twotone" />
              Pet Manage
            </Button>
          </li>
          <li>
            <Button
              className="flex w-full items-center hover:opacity-70"
              variant="light"
              onClick={() => onSelectPage("Approval")}
            >
              <Icon className="h-4" icon="uil:setting" />
              Adopt Approval
            </Button>
          </li>
          <li>
            <Button
              className="flex w-full items-center text-red-700 hover:opacity-70"
              variant="light"
              onClick={async () => {
                await signOut();
              }}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// import React from "react";
// import { Button } from "@nextui-org/react";
// import { Icon } from "@iconify/react";

// export default function Menu() {
//   return (
//     <div>
//       <div className="flex h-screen w-48 flex-col items-center bg-gray-100 p-4 py-10">
//         <div className="mb-10 cursor-default text-2xl text-black">PetPal</div>
//         <nav className="flex-1">
//           <ul className="space-y-6">
//             <li>
//               <Button
//                 className="flex w-full items-center hover:opacity-70"
//                 variant="light"
//               >
//                 <Icon className="h-4" icon="line-md:home-twotone" />
//                 Home
//               </Button>
//             </li>
//             <li>
//               <Button
//                 className="flex w-full items-center hover:opacity-70"
//                 variant="light"
//               >
//                 <Icon className="h-4" icon="uil:setting" />
//                 Settings
//               </Button>
//             </li>
//             <li>
//               <Button
//                 className="flex w-full items-center text-red-700 hover:opacity-70"
//                 variant="light"
//               >
//                 Logout
//               </Button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }
