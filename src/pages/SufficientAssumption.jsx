import React from "react";

const SufficientAssumption = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "https://share-na2.hsforms.com/1pSUh__rtTxKFGJx2SbYi5g401key";
    link.download = "https://share-na2.hsforms.com/1pSUh__rtTxKFGJx2SbYi5g401keys";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <main className="blogs max padding spacer">
        <article>
          <h1>A Simple Way to Level up Your Sufficient Assumption Approach</h1>

          <section className="blog-details">
            <div className="title">
              <h3 className="date">16 March 2025</h3>
              <div className="author">
                <img src="/assets/david.png" alt="David McMaster" />
                <p className="david">David McMaster</p>
              </div>
              <button onClick={handleDownload}>Download</button>
            </div>
            <img
              src="https://res.cloudinary.com/derzriuel/image/upload/v1744267521/Sufficient_Assumption_jouyrr.png"
              alt="Sufficient Assumption Guide"
              className="blog-pic"
            />
          </section>

          <p className="sub-heading">There's a very simple formula for finding sufficient assumptions that is too often overlooked, and it's the very simple, "If premise, then conclusion." How does it work? Well, we need to start with some background information.</p>

          <h2>Background Information</h2>
          <p>(I know you probably already know this. Bear with me, please. It helps to go over this super briefly first.)</p>
          <p>An argument always has at least one premise and one conclusion.</p>

          <h3>Here's a short argument:</h3>
          <blockquote>
            <p>"I'm hungry, so I should eat something."</p>
          </blockquote>
          <p><strong>Premise?</strong> "Hungry."</p>
          <p><strong>Conclusion?</strong> "Should Eat."</p>

          <p className="logic">P: H ✔<br />—————<br />C: E ✔</p>
          <p>But that argument isn't perfect the way it is. If it seems perfect, that's because we're bringing in outside information. A space alien with perfect knowledge of logic, but no idea of the meaning of the words "hungry" or "eat," wouldn't be convinced by that. That space alien would be missing the connecting logical strand that ties those two concepts together. But that alien WOULD be convinced once they learn,</p>

          <blockquote>
            <p>"If you are hungry, then you should eat."</p>
          </blockquote>
          <p className="logic">P: H ✔<br />P: H → E<br />—————<br />C: E ✔</p>

          <p>And the thing is... that simple formula will work to justify any argument. It will create a sufficient assumption.</p>

          <h2>Making Both Sensible and Crazy Arguments Perfect</h2>
          <p>It has wide applicability. It works for sensible real world arguments. The argument:</p>
          <blockquote>
            <p>"I'm going to go to law school, therefore I should take the LSAT."</p>
          </blockquote>
          <p className="logic">P: LS ✔<br />—————<br />C: Take LSAT ✔</p>
          <p>...is made perfect by adding:</p>
          <blockquote>
            <p>"...because if you're going to law school, then you need to take the LSAT."</p>
          </blockquote>
          <p className="logic">P: LS ✔<br />P: LS → Take LSAT<br />—————<br />C: Take LSAT ✔</p>

          <p>But it also works for nonsensical arguments. Suppose you and a friend overheard a guy saying:</p>
          <blockquote>
            <p>"I like cheese, so I must be king of the moon."</p>
          </blockquote>
          <p className="logic">P: Like Cheese ✔<br />—————<br />C: King of Moon ✔</p>
          <p>In the real world, when your friend turns to you and whispers, "Hey, what's that guy's problem? What a crazy thing to say. What could he be assuming to make such a claim?" ...you might realistically say, "I have no idea, and I don't want to try to get into their head." But on the LSAT, you can quickly and confidently reply, "That's simple. They're assuming that...</p>
          <blockquote>
            <p>"if someone likes cheese, then they're king of the moon!"</p>
          </blockquote>
          <p className="logic">P: Like Cheese ✔<br />P: LC → KoM<br />—————<br />C: King of Moon ✔</p>
          <p>Perfectly logical (though nonsensical) argument!<br />
          "If premise, then conclusion" works to justify even nonsensical arguments.</p>

          <h2>Brief Reminder</h2>
          <p>Some students have heard me say:</p>
          <blockquote>
            <p>"The two statement argument, 'I am hungry, so I should eat something' depends on the single-statement assumption, 'if one is hungry, then one should eat something,'"</p>
          </blockquote>
          <p>...and responded with, "Dude, what?! You just said the same thing twice."</p>
          <p>But nope!</p>
          <p>An argument is composed of (at least) two different, stand-alone statements: "I am hungry. I should eat something." Premise, conclusion. But not only is an 'if-then' statement (like "If I am hungry, then I should eat something,") not an argument, it's not even two different statements! An 'if-then' statement is always and forever one single statement. Think about it. We can't just say, "If I am hungry, period" and pretend it means anything by itself. "If I am hungry..." then what?? That's not a statement, that's a fragment.</p>

          <h2>The Rule in Simplest Abstract Form</h2>
          <p>Any argument structured with "X" as the premise and "Y" as the conclusion...</p>
          <p className="logic">P(remise): X<br />———<br />C(onclusion): Y</p>
          <p>...can be made perfect by adding the claim "If X, then you must have Y," turning it into</p>
          <p className="logic">P(remise): X<br />A(ssumption): X → Y<br />————<br />C(onclusion): Y</p>
          <p>...like the argument...</p>
          <p className="logic">P: This rule makes sense.<br />————<br />C: I'm going to try it out.</p>
          <p>...is made perfect by adding the assumption...</p>
          <p className="logic">P: This rule makes sense.<br />A: And if a rule makes sense, then a person should try it out.<br />—————<br />C: So I (a person) am going to try it out.</p>

          <h2>Another Simple Form</h2>
          <p>Suppose you come across an argument that claims</p>
          <blockquote>
            <p>"Socrates is human, therefore Socrates is mortal."</p>
          </blockquote>
          <p>We can diagram it as follows:</p>
          <p className="logic">P: S → H<br />————<br />C: S ——→M</p>
          <p>This makes logical sense to us, but wouldn't to the space aliens. We need to connect up the two unconnected pieces of information. What connection does humanity have with mortality?</p>
          <p>Remembering our formula, the tendency is to automatically create "If [complete premise,] then [complete conclusion,]" so:</p>
          <blockquote>
            <p>"If Socrates is human, then Socrates is mortal."</p>
          </blockquote>
          <p>But that ends up being a lot more than we need!</p>
          <p>Socrates is mentioned in the premises AND in the conclusion. So we DON'T need to connect Socrates in our 'if-then' assumption. The premise is about Socrates and the conclusion is about Socrates. He's on both sides of the argument already. He's fine. So when we're creating our "If [Premise] then [Conclusion]" we can leave out of it any information found on both sides of the argument, and we're left with:</p>
          <blockquote>
            <p>"If human, then mortal."</p>
          </blockquote>
          <p>And the complete argument, with both premises and assumption is:</p>
          <blockquote>
            <p>"Socrates is human, and if (anyone is) human, then (they are) mortal, therefore Socrates is mortal."</p>
          </blockquote>
          <p className="logic">P: S → H → M<br />C: S ——→ M</p>
          <p>Did the assumption need to specifically mention Socrates? No, it did not.</p>

          <p>And it doesn't matter how long the chain of reasoning in the premises goes:</p>
          <blockquote>
            <p>"Warner Brothers is in Hollywood, and Hollywood is part of L.A., and LA is located in California, and California is in the U.S., so therefore Warner Brothers is in North America."</p>
          </blockquote>
          <p className="logic">P: WB → H → L.A. → CA → U.S.<br />C: WB —————→N.A</p>
          <p>...unless it's doing something VERY tricky, we don't need to think through each link of the chain. We just need to connect that last piece from the chain of reasoning in the premises (the U.S.) and link it to the new information in the conclusion (North America)!</p>
          <blockquote>
            <p>"Warner Brothers is in Hollywood, and Hollywood is part of L.A., and LA is located in California, and California is in the U.S., so therefore Warner Brothers is in North America."</p>
          </blockquote>
          <p className="logic">P: WB → H → L.A. → CA → U.S. (last piece from premises)<br />C: WB ————→ N.A (new information in conclusion)</p>
          <p>So here, we want to add it "IF (last piece from premises) THEN (new info from conclusion)" which would end up looking like:</p>
          <blockquote>
            <p>"Warner Brothers is in Hollywood, and Hollywood is part of L.A., and LA is located in California, and California is in the U.S., and if (something is) in the U.S. then (it is) in N.A., so therefore Warner Brothers is in North America."</p>
          </blockquote>
          <p className="logic">P: WB → H → L.A. → CA → U.S. → N.A.<br />C: WB —————→ N.A.</p>
          <p>Long story short, when using "if premise, then conclusion" where there's a long chain of premises, we just need to link up the last piece of information from the premises to the new information from the conclusion."</p>

          <h2>The Structural Approach Working With Other Question Types</h2>
          <p>Being able to see the LSAT in this mechanical way isn't guaranteed to get you into the 170s, but it's a good start on making your LSAT journey faster and less stressful (since it helps you get more answers right, more quickly. It can even help you out with other question types.)</p>
          <p>Below is one example a student brought to me today. It's one of the last questions on PT 157. This student was engaging in a great intellectual battle with it. And I get that: this was a smart student, but this is an LSAT problem that can be very hard without the right approach. But they didn't have the right approach. THEY ended up thinking through it with deep, weighty, and nuanced real world ideas. I did not. I used the right, simple approach, and got it done much faster (and more correctly) than the student. That's not a reflection on me or the student, but on the right approach.</p>
          <p>Here's the problem:</p>
          <blockquote>
            <p>"The more profitable a corporation is, the more valuable its managers' time is. As a result, it is especially costly for highly profitable corporations to have their managers spend time monitoring employees. Such corporations can save money by reducing this monitoring, as long as the employees are given strong incentives to keep working hard. So highly profitable corporations can save money by giving their employees expensive bonuses."</p>
          </blockquote>
          <p>I just saw a simple mechanical structure, the student did not. So I did much less thinking. I did something much simpler, much more crude, and MUCH faster than what the student did. And I came up with an accurate idea of what the right answer would be, not because of some kind of raw brain power, but because of the rule!</p>
          <p>Here's the chain of reasoning I saw that looked to me like,</p>
          <p className="logic">P: A → B<br />————<br />C: A ——→C</p>
          <blockquote>
            <p>"The more profitable a corporation is, the more valuable its managers' time is. As a result, it is especially costly for highly profitable corporations to have their managers spend time monitoring employees. Such corporations can save money by reducing this monitoring, as long as the employees are given strong incentives to keep working hard. So highly profitable corporations can save money by giving their employees expensive bonuses."</p>
          </blockquote>
          <p>Granted, the chain was much longer:<br />
          P: ↑ profit. corp → VMT → E2ME → S$RM → incentives to work hard.<br />
          C: ↑ profit. corp ———→ exp. Bonuses</p>
          <p>But the idea was the same—link up the last piece of information from the premises to the new information from the conclusion.</p>
          <p>(The diagramming above makes it look a lot harder than it was. I didn't diagram it. I just followed the line of reasoning in the premises beginning with "profitable corporations" down to "incentives" and then saw that the conclusion started off at the same beginning "profitable corporations", but ended by bringing in new information: "expensive bonuses."</p>
          <p>This is a necessary assumption question, not a sufficient assumption question, so we don't have to create an assumption of "If Premise, then (necessarily) Conclusion." Instead all we have to do is create an assumption of "If Premise, then (some chance of) Conclusion." Knowing that, it's easy to create an assumption "if 'strong incentives to keep working hard' then that might be 'expensive bonuses.'</p>
          <p className="logic">incentives to work hard → can include exp. Bonuses</p>
          <p>(If "incentives to work hard" DOESN'T include "expensive bonuses" then this argument will fall apart.)</p>
          <p>Granted, the chain was much longer:</p>
          <p className="logic">P: ↑ profit. corp → VMT → E2ME → S$RM → incentives to work hard → can include exp. Bonuses<br />
          C: ↑ profit. corp ———→ exp. Bonuses</p>
          <p>And as it turned out, that was the right answer. And so I didn't need to read every wrong answer choice closely to try to understand them. I just needed to quickly search through them to find the answer I had already pre-phrased among them.</p>
          <p>So while the student was slowly going over each answer choice and really thinking through them, I just glanced at each answer choice in turn very briefly, only asking, "Does this say that expensive bonuses can be incentives to work hard, or not?" When I found one that said that, the problem was solved.</p>
          <p>The student was engaging in a lot more high level thought than I was, and engaging in much MORE thought than I was. I just used a very simple tool. "If premise, then conclusion."</p>
          <p className="end">It works pretty well. Try it out, and let me know how it goes for you!</p>
        </article>
      </main>
    </>
  );
};

export default SufficientAssumption;