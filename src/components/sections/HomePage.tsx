"use client";

import { useGame } from "@/contexts/GameContext";
import { Link } from "lucide-react";
import { buttonVariants } from "../ui/button";
import GameBoard from "../widgets/GameBoard";
import { CompletionStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";


interface GameData {
  id: number;
  date: string;
  weight: number;
  completionStatus: string;
  userId: number;
}

const Content = () => {
  //const { gameStatus } = useGame();
  const [ status, setStatus] = useState<CompletionStatus>(CompletionStatus.PENDING);
  const { data: session } = useSession();
  console.log(JSON.stringify(session));

  const getData = async () => {
    const response = await fetch("/api/dailypuzzle");
    const data: GameData[] = await response.json();  
    if (data.length === 0) {
      console.log("Data array is empty");
      return;
    }
    console.log("getData() called in Home Page", data)
    const currentDate = new Date().toISOString()
    console.log("Current date: ", currentDate)
    const filteredData = data.filter(
      entry => entry.userId.toString() === session?.user.id && entry.date.slice(0, 9) === currentDate.slice(0, 9)
    );
    if (filteredData.length === 0) {
      console.log("No matching data found for the current date and userId");
      return;
    }
    const currentStatusString = filteredData[0].completionStatus;
    const currentStatus = CompletionStatus[currentStatusString as keyof typeof CompletionStatus];

    setStatus(currentStatus);
  }

  useEffect(() => {
    getData();
  })
  return (
    <>
      {status != CompletionStatus.PENDING ? (
        <p className="text-white">Come back tomorrow</p>
      ) : (
        <div>
          <GameBoard />
          <Link href="/user" className={buttonVariants()}>
            Open Admin
          </Link>
        </div>
      )}
    </>
  );
};

export default Content;
