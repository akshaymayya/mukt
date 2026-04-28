import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-[#E1E0CC] font-sans selection:bg-primary/20">

      {/* Simple Header */}
      <nav className="bg-[#101010] border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="font-bold text-lg md:text-xl tracking-tight text-[#E1E0CC]">
          Mozara.io
        </Link>
        <Link to="/" className="text-primary text-sm hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto py-16 px-6 md:px-0">
        <h1 className="text-4xl md:text-5xl font-medium mb-12">About Us</h1>

        <div className="space-y-12 text-gray-400 leading-relaxed text-sm md:text-base">

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">What's in the Name?</h2>
            <p className="mb-4"><strong>Catifaal</strong> is not random.</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><em>Cati</em> — shortened from <strong>catalyst</strong>. The substance that makes reactions happen faster without being consumed.</li>
              <li><em>Faal</em> — our own word. It means <strong>function</strong>.</li>
            </ul>
            <p>That's exactly what we are. We don't take over your business. We function as the catalyst that makes it move faster, smarter, and further.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">Where It Started</h2>
            <p className="mb-4">During the pandemic, our founder <strong>Akshay S Mayya</strong> was doing graphic design  picking up gigs, learning the craft, figuring things out one project at a time.</p>
            <p className="mb-4">After pre-university, he moved into UI/UX and web development. But something else caught his attention.</p>
            <p className="mb-4">Small and mid-sized business owners around him were struggling  not with their work, but with systems that were supposed to help them. The <strong>GeM Portal</strong> (Government e-Marketplace) was one of them. Designed to connect businesses with government procurement, it was sitting unused by the very people it was built for. Business owners didn't know how to register, how to track tenders, or how to place bids.</p>
            <p className="mb-4">Akshay learned the system inside out. Then he started helping.</p>
            <p className="mb-4">He began registering businesses on GeM, tracking tenders, placing bids on their behalf, and handling other government registration services  charging 1–2% of the contract value secured. Simple, fair, and results-driven.</p>
            <p>Word spread. The work grew.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">From One to Four</h2>
            <p>What started as a solo effort is now a <strong>team of four</strong> each person carrying the same agenda. No shortcuts. No noise. Just work that actually moves the needle for business owners.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">Where We Are Headed</h2>
            <p className="mb-4">We started by providing internet and digital services. That chapter built us. But we are not stopping there.</p>
            <p className="mb-4">We are now <strong>partially shifting toward building</strong>  creating tools and infrastructure that solve real problems for the businesses we have always served.</p>
            <p>Not just for small MSMEs. We are equally focused on building strong, lasting relationships with <strong>institutional and mid-sized companies</strong> who need more than a service provider they need a partner who understands how business actually works on the ground.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">What Drives Us</h2>
            <p className="mb-4">We don't want to be known by our name.</p>
            <p className="mb-4">We want to be known by what we build, what we fix, and what we make possible for the people we work with.</p>
            <p className="mb-8 font-medium text-[#E1E0CC]">That is the Catifaal standard.</p>

            <p className="italic text-primary">A team of four. A clear agenda. And a lot of work still to do.</p>
          </section>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Mozara. All rights reserved.</p>
      </footer>
    </div>
  );
}
