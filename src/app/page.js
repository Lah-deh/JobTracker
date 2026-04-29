"use client";

import { supabase } from "./lib/supabase";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.auth.getSession();
      console.log(data, error);
    }

    test();
  }, []);

  return <div>Check console</div>;
}