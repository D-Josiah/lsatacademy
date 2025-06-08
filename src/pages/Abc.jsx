import React from "react";

const Abc = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "https://drive.google.com/uc?export=download&id=1r38YPISvcAyGCLipPIWa6297GgI4TndR";
    link.download = "https://drive.google.com/uc?export=download&id=1r38YPISvcAyGCLipPIWa6297GgI4TndR";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <main className="blogs max padding spacer">
        <article>
          <h1>The ABCs of Applying to Law School</h1>

          <section className="blog-details">
            <div className="title">
              <h3 className="date">5 April 2025</h3>
              <div className="author">
                <img src="/assets/david.png" alt="David McMaster" />
                <p className="david">David McMaster</p>
              </div>
              <button onClick={handleDownload}>Download</button>
            </div>
            <img
              src="https://drive.google.com/uc?export=view&id=1s2oxlzg14SKsCKGNMYJrItZlOKIwDJjT"
              alt="Law School Application Guide"
              className="blog-pic"
            />
          </section>

          <p className="sub-heading">From studying for the LSAT to gathering recommendations and crafting your personal statement, applying to law school requires careful planning. Here's your comprehensive guide to navigating the process.</p>

          <h2>1. Choosing When to Apply</h2>
          <p>Once you've decided to go to law school a lot of preparation needs to be done, so creating a timeline should be the first thing you should do. From studying for and achieving your LSAT score, getting personal statements from those professors that know you best, getting your transcripts, filling out the addenda for each particular law school, creating your personal statement—from first to final draft—all this requires planning and time.</p>
          <p>In a perfect world you'd leave yourself about 9 months of preparation time before sending out the applications, which typically happens around new year, for a school year that begins 9 months later. Budgeting your time wisely is a must. In order to do that, the very first step in applying to law school is choosing which cycle to apply. Fall 2027? Fall 2028? Spring 2029? What year will give you enough time to put your best foot forward?</p> 
          <p>(About 15% of law schools allow for spring admissions, though most law schools begin their year in the fall.) All begin accepting applications almost one year in advance, and you want to have accomplished everything on this list by that point in time.</p>

          <h2>2. Early Applications are Best Applications</h2>
          <p>The reason why, in a perfect world, your best application will be ready to send out as soon as admissions open is that most law schools have rolling admissions. That means schools don't wait months and months until all the applications are in to look at them and judge them all together, instead they start judging—and accepting—applications in waves. Earlier applications are seen when all the available slots are open, later applications are viewed only after many other students have been accepted. In essence, the later in the application cycle you apply, the less chance it is of your application being accepted. Because of this, the earlier you send in your application, the greater your chances are of being accepted.</p>

          <p>This also applies for scholarship offers. The earliest applications are viewed when all the scholarship money is still available. The later your application goes out, the more funding may have already been promised to others. Early applications are best applications.</p>

          <blockquote>
            <p>But as said at the outset, "in a perfect world, your best application will be ready as soon as admissions open." And sometimes, the application you have ready when admissions open isn't your best application.</p>
          </blockquote>

          <p>Maybe you're still waiting for your most recent LSAT score to come back, or for that last letter of recommendation to come in. In such a situation it may be best to wait to apply, so as to put your very best foot forward, but it may be better just to submit as is, accompanied by an addendum noting that a crucial piece of evidence may follow shortly. When you're on the fence as to whether to wait to apply or not—this is one of those times when you absolutely should contact the admissions office and listen to the advice that they give you!</p>

          <h2>3. Careful Law School Consideration</h2>
          <p>You need to go to Harvard or Yale or else your future is over. Almost every lawyer practicing hasn't gone to Harvard and Yale, and the vast majority of the best lawyers have not. It's true that some law schools in the lowest tiers, even though accredited, are very sketchy. I'll leave it to you to do your research and figure out which of the lowest range are to be avoided. But the highest range of law schools, the T14, in you get accepted there, you're really not going to go wrong with any of those. And there are dozens and dozens of schools out there that are NOT T-14 that will give you an excellent education in any field of law you like.</p>

          <p>If you have a good idea of what type of law you want to practice, do your research. It's almost always the case that the best law schools for specific fields of law include some T14 schools and some non-T14 schools. Don't get too hung up on the Gucci-like name of Harvard or Yale. Other schools can often provide the same excellent education those provide at a fraction of the price… and they demand much less in terms of LSAT score.</p>

          <p>There are people at each of these schools, people that get paid a nice salary, a 401-K, health and dental, all so that they can field emails, phone calls, and tweets from people like you. Make them earn their money. Get to know people. Ask questions. Unless you're actively rude, people won't mind your questions, and usually they stick with their job because they actually like answering questions. Be proactive in vetting the colleges you're interested in.</p>

          <blockquote>
            <p>Remember, another word for lawyer is "advocate." Law Schools can only respect a person who shows that they are an effective advocate for themself. That's exactly the kind of person they want to let into their school.</p>
          </blockquote>

          <h2>4. Choosing When To Take The LSAT</h2>
          <p>This can be done while you're still choosing which law schools you're interested in applying to. After you've determined the year you're applying for, and the date that admissions begin for that cycle, you can start to figure out your LSAT study plan. You'll be sending out your applications about a year before you hope to be in law school, and you want to have achieved your best LSAT score by then.</p>

          <p>In a perfect world, you only take the LSAT once, get a 180, and never look back. But many people take the test multiple times to get their best score. If you have the flu on the day of the test, or if your upstairs neighbors have a loud party the night before, you may choose to do this too. Leave enough time in your plans to take the LSAT more than once in case something arises.</p>

          <p>All in all, 9 months before admissions open is a great time to begin your LSAT journey. Three is often all that some people need, but others take more like six months. To be on the safe side, budget that six months for study, as well as an additional 3 months for re-takes of the test. Remember, this silly test is worth about as much as your full 4 year GPA. You REALLY want to use this as a test as a time to shine!</p>

          <h2>5. The LSAT Itself</h2>
          <p>This is a 5 section test, only 3 sections of which count towards that important LSAT score: (2) 35-minute sections of short (about 25) Logical Reasoning questions, (1) 35-minute section of 4 Reading Comprehension paragraphs, and (1) experimental section which can be either Logical Reasoning or Reading Comprehension. You won't know which is which when taking the test. The 5th section is an unscored writing sample which will be sent to every school you apply to. Also 35 minutes, you don't have to take the writing sample on the day of the test, and can opt to write it out a few days before or after your test.</p>

          <h2>6. Beginning Your LSAT Study/Determining Your Target Score</h2>
          <p>Completing a timed diagnostic LSAT before beginning your LSAT studies is a must. Everyone hates this, and for good reason: the majority of these diagnostic scores are well below 150, the median score. If yours is as well, this don't freak out. You're in good company. You were always going to study for the LSAT, now you're aware that you need to. You're just like everyone else.</p>

          <blockquote>
            <p>No LSAT score is good or bad in of itself, a score is good only if it does what you need it to do.</p>
          </blockquote>

          <p>Typically a "good score" gets you into the school of your choice OR your "good score" gets you into the school of your choice AND it gets you the funding you need. Don't get hung up on comparing yourself to others. If a 143 gets you into the school of your choice, that's a "good score." If a 169 does not get you into the school of your choice, it is not a "good score."</p>

          <p>Now is when you go to an online LSAT/GPA calculator. That will help you determine what your target LSAT score should be. Plug into the calculator your GPA and then experiment by putting in various LSAT scores. The calculator will tell you the odds of your having been accepted into the school of your choice with that LSAT/GPA combo over the last few years. Play around with the numbers until you find the LSAT score that makes it likely you get into the school of your choice. This will tell you the LSAT score range that you're shooting for. This target score, in combination with your diagnostic, will tell you how much improvement you have to make on the LSAT for admittance to the law school of your choice.</p>

          <h2>7. The LSAT Study Plan</h2>
          <p>The one necessity is a paid LawHub Advantage account, so you have access to real, actual LSAT preptests. Whether you take a test-prep course or you pay for online tutoring, all legitimate tutors will require that you've purchased a 1 year license to LawHub in order to legally access everything LSAT related. If you're completely self-studying, you can still buy books that contain past preptests and so aren't required to purchase a LawHub account. But even if for no other reason, having a paid LawHub account would probably be worth it alone for the fact that you can use it to practice taking tests online in the exact same computerized format that you will be doing on test day.</p>

          <p>How to form an LSAT study plan for yourself is something a tutor can help you do. There are also study plans floating about the web that offer you 6-week, 8-week, 12-week study plans for studying on your own. Beyond that, in person test prep companies are one valid option for giving you a study plan. Some (like PowerScore) are more reputable, others are less. The same is true of purely online options: some (like LSAT Labs) will serve the self-directed student well, others less well so. Some students choose to entirely self-study using a combination of test-prep books. One way or the other, a student needs to have a structured study plan, whether it's provided by a Test-Prep course, a tutor, or it's self-provided. There are many great resources online. A little research goes a long way.</p>

          <h2>8. Test Day</h2>
          <p>You've found the schools you want to apply to and you're ready to take the LSAT. If you haven't before now, you now must create an LSAC account. The LSAC administers the LSAT. Make sure everyone within a 5 mile radius know you're taking the LSAT on test day so that the world will be quiet. (Ok, the radius can be smaller, but don't be shy about telling your close neighbors that you're taking a super important test as the day approaches.) Find a place that you feel certain will be quiet, and in a perfect world this will be the exact same spot you've been doing all your studies. Hit the bathroom before the test. Take deep breaths and remember all the preparation you've put into this. Everyone gets stressed out on test day. That's normal. Not everyone will have done the work that you have. You got this.</p>

          <h2>9. Putting it all together</h2>
          <p>You're sending out your applications now. You'll be doing this through LSAC. They will accept all your application documents, and send them off to the Law Schools of your choice. To do this, you'll pay for the CAS (the Credential Assembly Service,) which will compile the 2-4 letters of recommendation (LOR) you've collected, your resume, the transcripts of your grades from higher learning, your personal statement, any addenda that your law school requests from you in order to explain situations that otherwise might look odd (unexplained gap years on a resume, bad grades, diverse personal situations,) and of course a diversity statement—if applicable for you. Most essays you write can be sent to several different schools with only a little need for tweaking, but always double-check! Make sure that any personalization you've done for one school is edited out before submitting it for another school. At this point you relax. Take a hot bath, go for a run, enjoy a refreshing beverage. You've done what you can. Now you wait to see how many of the schools you applied to were smart enough to accept you.</p>

          <h3>Law School Application Checklist</h3>
          <ul>
            <li>Timeline created</li>
            <li>Law Schools investigated</li>
            <li>Tutors/Test-Prep companies compared</li>
            <li>3-6 months of study</li>
            <li>Letters of recommendation requested/received</li>
            <li>Personal statement completed</li>
            <li>Resume updated and completed</li>
            <li>Addenda/Diversity statements completed</li>
            <li>LSAC account created</li>
            <li>LSAT taken</li>
            <li>LSAT writing sample sent in</li>
            <li>Transcripts Ordered</li>
            <li>CAS ordered</li>
          </ul>
          
          <p className="end">Good luck with your law school journey!</p>
        </article>
      </main>
    </>
  );
};

export default Abc;