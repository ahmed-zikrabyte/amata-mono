"use client";

import React, { useState } from "react";
import { Button } from "@workspace/ui/components/button";

const OurStoryClient = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-4 md:space-y-3 mt-8">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-normal pt-2">
        The Turning Point - A Farm is Born
      </h3>
      <p className="text-sm sm:text-base">
        Instead of settling for less, my father made a bold decision – if we
        can’t find purity, we’ll create it.
      </p>
      <p className="text-sm sm:text-base">
        He bought 25 pure-bred Gir cows from Gujarat, brought them to Jharkhand,
        and started our family’s dairy farm. He built it brick by brick, with
        the help of villagers, ensuring the cows grazed freely, were fed
        naturally, and were never injected with hormones.
      </p>
      <p className="text-sm sm:text-base">
        What began as a necessity soon became a passion. My father mastered the
        bilona method – a slow, traditional churning process that retains the
        nutrition, aroma, and taste of ghee. Over time, he supplied fresh milk
        and ghee to neighbours, relatives, and close friends in Mumbai, who
        swore it was unlike anything they had tasted.
      </p>

      {show && (
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-normal pt-2">
            A Tradition That Never Stopped
          </h3>
          <p className="text-sm sm:text-base">
            Even today, our farm in Jharkhand continues to operate. Our cows are
            part of the family – named, cared for, and loved. The same traditional
            methods my father started with are still used. The only change is that
            now, we are bringing this purity to your home, anywhere in India.
          </p>
          <p className="text-sm sm:text-base">
            Before Amata Farms, I started a small Facebook page called Gir Amrit,
            delivering milk and ghee to a close circle in Mumbai and later in
            Bangalore. The feedback was overwhelming – people craved real,
            unadulterated food.
          </p>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-normal pt-2">The Bangalore Chapter</h3>
          <p className="text-sm sm:text-base">
            When I moved to Bangalore, I tried to source the same kind of ghee my
            family made – and failed. Every jar lacked that rich golden aroma and
            taste I grew up with. That’s when I knew – it’s time to share our
            family’s tradition with everyone.
          </p>
          <p className="text-sm sm:text-base">
            Today, through Amata Farms, we bring you 100% A2 Gir Cow Bilona
            Ghee, made exactly the way my father made it decades ago. The same
            method, the same care, the same love – only now, we deliver it to
            your doorstep.
          </p>
          <p className="text-sm sm:text-base">It’s not just ghee. It’s our family’s promise of purity.</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          variant="link"
          onClick={() => setShow((prev) => !prev)}
          className="text-sm sm:text-base"
        >
          {show ? "Show less..." : "Read more..."}
        </Button>
      </div>
    </div>
  );
};

export default OurStoryClient;
