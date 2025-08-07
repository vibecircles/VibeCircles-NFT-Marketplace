import type { NextPage } from "next";
import Image from "next/image";

/**
 * About page with information about the marketplace and team.
 */
const About: NextPage = () => {
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="mb-6 text-black font-bold text-5xl">
          <span className="text-transparent bg-clip-text gradient">
            About VibeCircles
          </span>
        </h1>
        <p className="text-black/60 text-xl max-w-3xl mx-auto leading-relaxed">
          Discover the story behind the most exclusive NFT marketplace dedicated to unique, 
          one-of-a-kind digital art that captures the essence of individuality and creativity.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-black mb-6">
            Our Mission
          </h2>
          <p className="text-black/70 text-lg leading-relaxed mb-6">
            At VibeCircles, we believe every digital creation should be as unique as the person 
            who owns it. Our marketplace is built on the principle that true value comes from 
            uniqueness and authenticity.
          </p>
          <p className="text-black/70 text-lg leading-relaxed">
            We're not just selling NFTs – we're curating experiences, emotions, and connections 
            through art that speaks to the soul. Each VibeCircle is crafted with intention, 
            designed to resonate with collectors who appreciate the extraordinary.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
            <Image
              src="/hero-asset.png"
              alt="VibeCircles Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-black text-center mb-12">
          Why Choose VibeCircles?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">Unique Artwork</h3>
            <p className="text-black/70">
              Every NFT is one-of-a-kind, ensuring your collection stands out from the crowd.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">Secure Trading</h3>
            <p className="text-black/70">
              Built on blockchain technology with smart contracts ensuring safe and transparent transactions.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient flex items-center justify-center">
              <span className="text-2xl">🌟</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">Exclusive Community</h3>
            <p className="text-black/70">
              Join a curated community of art enthusiasts and collectors who value uniqueness.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-black text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
              <Image
                src="/user-icon.png"
                alt="Team Member"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Alex Chen</h3>
            <p className="text-black/60 mb-2">Founder & Creative Director</p>
            <p className="text-black/70 text-sm">
              Passionate about digital art and blockchain technology, Alex leads our creative vision.
            </p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
              <Image
                src="/user-icon.png"
                alt="Team Member"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Sarah Johnson</h3>
            <p className="text-black/60 mb-2">Head of Technology</p>
            <p className="text-black/70 text-sm">
              Expert in blockchain development and smart contract architecture.
            </p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
              <Image
                src="/user-icon.png"
                alt="Team Member"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Marcus Rodriguez</h3>
            <p className="text-black/60 mb-2">Community Manager</p>
            <p className="text-black/70 text-sm">
              Dedicated to building and nurturing our vibrant collector community.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-black text-center mb-12">
          VibeCircles by the Numbers
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold gradient mb-2">10,000+</div>
            <p className="text-black/70">Unique NFTs Created</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient mb-2">5,000+</div>
            <p className="text-black/70">Happy Collectors</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient mb-2">$2M+</div>
            <p className="text-black/70">Total Volume Traded</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient mb-2">24/7</div>
            <p className="text-black/70">Community Support</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
        <h2 className="text-3xl font-bold text-black mb-6">
          Get in Touch
        </h2>
        <p className="text-black/70 text-lg mb-8 max-w-2xl mx-auto">
          Have questions about VibeCircles? Want to learn more about our collection? 
          We'd love to hear from you and help you discover your perfect NFT.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="mailto:hello@vibecircles.com"
            className="px-8 py-3 rounded-lg gradient border-white/10 border transition-all hover:shadow-lg"
          >
            Contact Us
          </a>
          <a
            href="https://twitter.com/vibecircles"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg bg-white/[.04] transition-all hover:bg-white/[.06] border-white/10 border"
          >
            Follow Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About; 