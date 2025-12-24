"use client";
import Image from "next/image";
import GoogleLogo from "@/public/google.webp";
import GithubLogo from "@/public/github-mark.svg";
import DiscordLogo from "@/public/Discord-Symbol-Blurple.svg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";

export default function Page() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>,ClientSafeProvider> | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const getIconImage = (id: string) => {
    switch (id) {
      case "github":
        return GithubLogo;
      case "google":
        return GoogleLogo;
      case "discord":
        return DiscordLogo;
      default:
        return GoogleLogo;
    }
  };

  return (
    <div className="w-full max-w-md px-6">
      {/* <div className="flex items-center gap-3 mb-8">
        <Image src={MeetynxLogo} alt="Meetynx Logo" className="size-14 scale-150" />
        <p className="font-semibold text-2xl">Meetynx</p>
      </div> */}

      <div className="mb-8">
        <p className="text-2xl font-semibold">Automate your meeting notes</p>
        <p className="text-sm text-gray-500 mt-1">
          Transcribe, summarize, search and analyze all your voice
          conversations.
        </p>
      </div>

      {providers && (
        <div className="flex flex-col gap-3">
          {Object.values(providers).map((provider) => (
            <Button
              key={provider.id}
              variant="secondary"
              onClick={() => signIn(provider.id)}
              className="py-6 cursor-pointer px-4 rounded-md border border-gray-300/70 hover:border-gray-400/70 flex items-center justify-between transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={getIconImage(provider.id)}
                  alt={provider.name}
                  className="size-5"
                />
                <span className="text-sm font-medium">
                  Continue with {provider.name}
                </span>
              </div>
              <ArrowRight className="size-4 text-gray-500" />
            </Button>
          ))}
        </div>
      )}

      {/* Footer */}
      <p className="text-xs text-gray-500 mt-6 leading-relaxed">
        By continuing, you agree to our{" "}
        <Link
          href={"/terms"}
          target="_blank"
          className="underline cursor-pointer text-black"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href={"/privacy"}
          target="_blank"
          className="underline cursor-pointer text-black"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
