import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";
const SocialLogins = ({ isLoading }: { isLoading: boolean }) => {
  const handleGoogleSignIn = async () => {
    await signIn("google");
  };
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-center items-center gap-2">
        <hr className="bg-gray-600 w-full pt-1 rounded-full" />
        <Label className="text-gray-500 text-sm">Or</Label>
        <hr className="bg-gray-600 w-full pt-1 rounded-full" />
      </div>

      <Button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex justify-center gap-5 bg-accent hover:bg-gray-700 border-[1px] border-zinc-700 px-12 text-white font-semibold py-2 rounded-full"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Image
              src={"/svgs/icon-google.svg"}
              alt="google"
              width={24}
              height={24}
            />
            <Label className="pr-4">Sign in with Google</Label>
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialLogins;
