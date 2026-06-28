import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "HPAA",
};

/** Runs before paint so scroll / hydration cannot flash alternate favicons. */
const faviconPinScript = `(function(){
  var ICON="/favicon.ico";
  var pinning=false;
  function isFaviconLink(link){
    var rel=(link.getAttribute("rel")||"").toLowerCase();
    if(rel.indexOf("apple")>=0)return false;
    return rel.indexOf("icon")>=0;
  }
  function pin(){
    if(pinning||!document.head)return;
    pinning=true;
    try{
      var icons=Array.prototype.slice.call(document.querySelectorAll("link[rel]")).filter(isFaviconLink);
      var keeper=null;
      for(var i=0;i<icons.length;i++){
        var href=icons[i].getAttribute("href")||"";
        if(href===ICON||href.indexOf(ICON+"?")===0){keeper=icons[i];break;}
      }
      if(!keeper){
        keeper=document.createElement("link");
        keeper.rel="icon";
        keeper.type="image/x-icon";
        keeper.sizes="any";
        keeper.href=ICON;
        document.head.appendChild(keeper);
      }
      for(var j=0;j<icons.length;j++){
        var link=icons[j];
        if(link!==keeper&&link.isConnected)link.remove();
      }
    }finally{
      pinning=false;
    }
  }
  pin();
  new MutationObserver(function(){pin();}).observe(document.head,{childList:true});
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="notranslate h-full" data-scroll-behavior="smooth">
      <body className="min-h-full antialiased" translate="no">
        <Script id="favicon-pin" strategy="beforeInteractive">
          {faviconPinScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
