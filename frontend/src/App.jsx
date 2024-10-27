import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NFTProductPage from "./components/NFTProductPage";
import AllProducts from "./components/AllProduct";
import { useNFTMarketplace } from "./hooks/useNFTMarketplace";
import Home from "./views/Home";
import Login from "./views/Login";
import PageNotFound from "./views/PageNotFound";
import Jobs from "./views/Jobs";
import Job from "./views/Job";
import Dashboard from "./views/DashBoard";
import Profile from "./views/Profile";

export default function NFTMarketplace() {
  const [listedNFTs, setListedNFTs] = useState([]);
  const { fetchListedNFTs } = useNFTMarketplace();

  useEffect(() => {
    // Fetch listed NFTs

    async () => await fetchListedNFTs();
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        {/* <Navigation /> */}
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:jobId" element={<Job />} />

            <Route
              path="/products"
              element={<AllProducts nfts={listedNFTs} />}
            />
            <Route path="/product/1" element={<NFTProductPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
