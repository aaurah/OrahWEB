"use client";

import { useState } from "react";

const SECTIONS = [
  { id: "general", label: "General" },
  { id: "payments", label: "Payments" },
  { id: "blockchain", label: "Blockchain" },
  { id: "email", label: "Email" },
  { id: "security", label: "Security" },
];

export default function AdminSettingsPage() {
  const [active, setActive] = useState("general");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";
  const labelClass = "block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Platform Settings</h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">Configure global platform behaviour and integrations</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <nav className="lg:w-48 shrink-0 space-y-1">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === id ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex-1 space-y-6">
          {active === "general" && (
            <>
              <SettingCard title="Site Configuration">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={labelClass}>Platform Name</label><input defaultValue="OrahWeb" className={inputClass} /></div>
                  <div><label className={labelClass}>Support Email</label><input defaultValue="support@orahweb.com" className={inputClass} /></div>
                  <div><label className={labelClass}>Domain (canonical)</label><input defaultValue="https://orahweb.com" className={inputClass} /></div>
                  <div><label className={labelClass}>Default Currency</label>
                    <select defaultValue="USD" className={inputClass}>
                      <option>USD</option><option>EUR</option><option>GBP</option>
                    </select>
                  </div>
                </div>
              </SettingCard>
              <SettingCard title="Feature Flags">
                <div className="space-y-4">
                  {[
                    { label: "Enable Web3 domain registration", key: "web3", defaultOn: true },
                    { label: "Enable traditional TLD registration", key: "trad", defaultOn: true },
                    { label: "IPFS website hosting", key: "ipfs", defaultOn: true },
                    { label: "Maintenance mode", key: "maint", defaultOn: false },
                    { label: "New user registrations", key: "signup", defaultOn: true },
                  ].map(({ label, key, defaultOn }) => (
                    <Toggle key={key} label={label} defaultValue={defaultOn} />
                  ))}
                </div>
              </SettingCard>
            </>
          )}

          {active === "payments" && (
            <>
              <SettingCard title="Payment Providers">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className={labelClass}>Stripe Publishable Key</label><input defaultValue="pk_live_..." className={inputClass} /></div>
                    <div><label className={labelClass}>Stripe Secret Key</label><input type="password" defaultValue="sk_live_..." className={inputClass} /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className={labelClass}>Coinbase Commerce API Key</label><input defaultValue="cb_live_..." className={inputClass} /></div>
                    <div><label className={labelClass}>Webhook Secret</label><input type="password" defaultValue="whsec_..." className={inputClass} /></div>
                  </div>
                  <Toggle label="Accept crypto payments (ETH, USDC)" defaultValue={true} />
                  <Toggle label="Accept card payments" defaultValue={true} />
                </div>
              </SettingCard>
              <SettingCard title="Pricing">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={labelClass}>Minimum domain price ($)</label><input type="number" defaultValue="3.99" className={inputClass} /></div>
                  <div><label className={labelClass}>Gas fee buffer (%)</label><input type="number" defaultValue="15" className={inputClass} /></div>
                </div>
              </SettingCard>
            </>
          )}

          {active === "blockchain" && (
            <>
              <SettingCard title="RPC Endpoints">
                <div className="space-y-5">
                  <div><label className={labelClass}>Ethereum Mainnet RPC</label><input defaultValue="https://mainnet.infura.io/v3/..." className={inputClass} /></div>
                  <div><label className={labelClass}>Polygon RPC</label><input defaultValue="https://polygon-mainnet.infura.io/v3/..." className={inputClass} /></div>
                  <div><label className={labelClass}>Solana RPC</label><input defaultValue="https://api.mainnet-beta.solana.com" className={inputClass} /></div>
                  <div><label className={labelClass}>IPFS Gateway</label><input defaultValue="https://gateway.ipfs.io" className={inputClass} /></div>
                </div>
              </SettingCard>
              <SettingCard title="Smart Contracts">
                <div className="space-y-4">
                  <div><label className={labelClass}>Registry Contract (Ethereum)</label><input defaultValue="0x049aba7510f45BA5b64ea9E658E342F904DB358D" className={inputClass + " font-mono text-xs"} /></div>
                  <div><label className={labelClass}>Registry Contract (Polygon)</label><input defaultValue="0xa9a6A3626993D487d2Dbda3173cf58cA1a9D9e9" className={inputClass + " font-mono text-xs"} /></div>
                  <div><label className={labelClass}>Resolver Contract</label><input defaultValue="0xb66DcE2DA6afAAa98F2013446dBCB0f4B0ab2842" className={inputClass + " font-mono text-xs"} /></div>
                </div>
              </SettingCard>
            </>
          )}

          {active === "email" && (
            <SettingCard title="Email Configuration">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={labelClass}>SMTP Host</label><input defaultValue="smtp.sendgrid.net" className={inputClass} /></div>
                  <div><label className={labelClass}>SMTP Port</label><input defaultValue="587" className={inputClass} /></div>
                  <div><label className={labelClass}>SMTP Username</label><input defaultValue="apikey" className={inputClass} /></div>
                  <div><label className={labelClass}>SMTP Password</label><input type="password" defaultValue="SG...." className={inputClass} /></div>
                  <div><label className={labelClass}>From Name</label><input defaultValue="OrahWeb" className={inputClass} /></div>
                  <div><label className={labelClass}>From Address</label><input defaultValue="noreply@orahweb.com" className={inputClass} /></div>
                </div>
                <Toggle label="Send registration confirmation emails" defaultValue={true} />
                <Toggle label="Send expiry reminder emails (traditional domains)" defaultValue={true} />
                <Toggle label="Send marketing emails" defaultValue={false} />
              </div>
            </SettingCard>
          )}

          {active === "security" && (
            <>
              <SettingCard title="Authentication">
                <div className="space-y-4">
                  <Toggle label="Require email verification on signup" defaultValue={true} />
                  <Toggle label="Enable two-factor authentication (2FA)" defaultValue={false} />
                  <Toggle label="Allow social login (Google, GitHub)" defaultValue={true} />
                  <div><label className={labelClass}>Session timeout (hours)</label><input type="number" defaultValue="24" className={inputClass} /></div>
                </div>
              </SettingCard>
              <SettingCard title="Rate Limiting">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={labelClass}>API requests / minute (public)</label><input type="number" defaultValue="60" className={inputClass} /></div>
                  <div><label className={labelClass}>API requests / minute (auth)</label><input type="number" defaultValue="300" className={inputClass} /></div>
                  <div><label className={labelClass}>Domain search / minute</label><input type="number" defaultValue="30" className={inputClass} /></div>
                  <div><label className={labelClass}>Login attempts before lock</label><input type="number" defaultValue="5" className={inputClass} /></div>
                </div>
              </SettingCard>
            </>
          )}

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={save}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            {saved && (
              <span className="text-sm text-emerald-400 font-medium flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved successfully
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-white mb-5 pb-4 border-b border-gray-800">{title}</h2>
      {children}
    </div>
  );
}

function Toggle({ label, defaultValue }: { label: string; defaultValue: boolean }) {
  const [on, setOn] = useState(defaultValue);
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-300">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${on ? "bg-blue-600" : "bg-gray-700"}`}
      >
        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}
