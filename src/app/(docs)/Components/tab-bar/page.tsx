
"use client";
import TabBar from "@/app/_components/Components/tab-bar/TabBar";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

function logData(txt:string){
  console.log('Logging data from TabBar Component: ', txt);
}

export default function TabBarDocs() {
  const [componentProps, setComponentProps] = useState({
    tabs: [
      {name:"Home",backgroundColor:"#007aff",image:"/assets/tab-bar/Home.svg", onClick: () => logData("Home clicked") },
      {name:"Transactions",backgroundColor:"#22973d",image:"/assets/tab-bar/cart.svg", onClick: () => logData("Transactions clicked")},
      {name:"Favorites",backgroundColor:"#4b46c2",image:"/assets/tab-bar/Favorites.svg", onClick: () => logData("Favorites clicked")},
      {name:"Profile",backgroundColor:"#e32c4d",image:"/assets/tab-bar/person.svg", onClick: () => logData("Profile clicked")},
    ],
    activeTab: "Home",
    onTabChange: (tabName: string) => logData(`Tab changed to: ${tabName}`),
  });

  const usage = `<TabBar 
  ${Object.entries(componentProps)
    .map(([key, value]) =>{
      if ( typeof value === "string" ) {
        return `${key}="${value}"`;
      } 
      else if (Array.isArray(value)) {
        return `${key}={${JSON.stringify(value)}}`
      }
      else if (typeof value === "object") {
        return `${key}={${JSON.stringify(value)}}`
      } 
      else if (typeof value === "boolean") {
        return `${key}={${value}}`
      }
      else if( typeof value === "function") {
        return `${key}={${value.toString()}}`
      }
      else {
        return `${key}={${value}}`
      }
    })
    .join("\n  ")} 
/>;`;

  return (
    <div className="p-4">
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={<TabBar {...componentProps} />}
        title="Tab Bar"
        importCode="import TabBar from 'xenkit/TabBar'"
        maxLength={15}
        isHorizontallyCentered={true}
        isVerticallyCentered={true}
        propControls={
          {
            note:{
              type: "note",
              noteText: "For this component pass array of objects with name, backgroundColor and image. Optinally onClick function can be passed to each tab. Also pass activeTab and onTabChange function to handle tab changes.",
            }

          }
        }
      />
    </div>
  );
}
