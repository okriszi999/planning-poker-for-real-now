import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { nameAtom } from "@/atoms/allAtoms";
import { useQuery } from "@tanstack/react-query";
import { helloHono } from "@/api/hello-hono";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["hello-Hono"],
    queryFn: helloHono,
  });
  const [isShown, setIsShown] = useState(false);
  const setName = useSetAtom(nameAtom);
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button>Click me</Button>

      <div className="mt-4">
        <Button onClick={() => setIsShown(!isShown)}>
          {isShown ? "Hide" : "Show"} me
        </Button>
        {isShown && <IAmShown />}
      </div>
      <br />
      <Button onClick={() => setName((Math.random() * 100).toString())}>
        Click me to change the value in the shown component
      </Button>

      <div className="mt-4">
        <h3>Response from the server:</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

function IAmShown() {
  const name = useAtomValue(nameAtom);
  return <div className="mt-2 p-2 bg-gray-100">{name}</div>;
}
