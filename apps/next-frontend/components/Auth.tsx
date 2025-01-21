"use client";
import React, { useEffect, useState } from "react";
import { InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Avatar from "./Avatar";
import Link from "next/link";
import useSignUpStore from "../lib/features/userAuth/signUpStore";
import { loginUserSchema, signupUserSchema } from "@repo/zod/src/userSchema";
import { useRouter } from "next/navigation";
import userAuthStore from "../lib/features/userAuth/userAuthStore";

const Auth = ({ mode = "signup" }) => {
  // Mode-based settings
  const router = useRouter();

  const isSignUp = mode === "signup";
  const avatarSeeds = ["user1", "user2", "johndoe", "surya", "sashi"];
  const [selectedSeed, setSelectedSeed] = useState<string | null>(null);
  const { setLoading } = userAuthStore();

  const {
    email,
    name,
    password,
    avatar,
    setAvatar,
    setEmail,
    setName,
    setPassword,
  } = useSignUpStore();

  const baseUrl = "http://localhost:8002/api/v1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const validatedData = signupUserSchema.safeParse({
          name,
          email,
          password,
          avatar,
        });

        const response = await fetch(`${baseUrl}/signup `, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(validatedData.data),
        }).catch((e) => {
          console.log(e.Messages);
        });

        // console.log(response);

        router.push("/signin");
      } else {
        const validatedData = loginUserSchema.safeParse({
          email,
          password,
        });
        console.log(validatedData);
        setLoading(true);
        const response = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(validatedData.data),
        })
          .then(async (res) => {
            const data = await res.json();
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/home");
            setLoading(false);
          })
          .catch((e) => {
            console.log(e.Messages);
          });
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleAvatarSelect = (seed: string) => {
    setSelectedSeed(seed); // Update the selected avatar URL
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex justify-center flex-col items-center mt-8">
        <img
          src="https://app.chitchat.gg/svgs/logo.svg"
          alt="logo"
          className="w-16 h-16"
        />
        <h1 className="text-3xl font-bold mt-4">
          Roomify<span className="text-pink-700">.com</span>
        </h1>
        <div className="flex p-2 gap-4">
          <span className="bg-slate-200 rounded-full p-2">
            <TwitterIcon size={16} />
          </span>
          <span className="bg-slate-200 rounded-full p-2">
            <LinkedinIcon size={16} />
          </span>
          <span className="bg-slate-200 rounded-full p-2">
            <InstagramIcon size={16} />
          </span>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-4 flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="shadow-md rounded-lg p-6 w-96 bg-slate-200"
        >
          <h2 className="text-2xl font-semibold text-center mb-4">
            {isSignUp ? "Join Roomify" : "Sign In to Roomify"}
          </h2>

          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
              required
            />
          </div>

          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone (optional)
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
              required
            />
          </div>

          {isSignUp && (
            <div className="mb-4">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium mb-2"
              >
                Choose an Avatar (optional)
              </label>
              <div className="flex gap-3">
                {avatarSeeds.map((seed) => (
                  <Avatar
                    seed={seed}
                    isSelected={selectedSeed === seed}
                    key={seed}
                    onSelect={handleAvatarSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-pink-600 transition-all"
            >
              {isSignUp ? "Join Roomify" : "Sign In"}
            </button>
          </div>

          {/* Toggle Link */}
          <div className="text-center mt-4">
            <p className="text-sm">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <Link
                href={isSignUp ? "/signin" : "/signup"}
                className="text-pink-700 font-medium hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
