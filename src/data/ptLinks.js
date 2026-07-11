// PrepTest -> LawHub module UUID (PTs 101-159).
// Generated from context/PT_Links_with_Sections.csv. Every section share the same
// module UUID, so a section deep-link is just `/section/<uuid>/Section%20<n>`.
const PT_MODULES = {
  101: "2bc99ef3-2c94-481c-ae9d-dff6e02c1c72",
  102: "08b18f64-7725-491a-82ef-ea858e3aa8c7",
  103: "1e3ca7bd-e671-48ae-aba8-9d0fc68cbebb",
  104: "ae5eb491-14fd-459b-9821-fe7ba81a50e5",
  105: "e61f9d77-0344-48e2-b0d4-00b5b986f045",
  106: "15e460bf-8891-4231-8a5b-68abbd919204",
  107: "8e9f5daa-9641-4a98-b6b5-6129fad96587",
  108: "dfe280a1-f632-4ef0-b019-3a8dafcf98f0",
  109: "41bd2e35-d982-46b7-b7d7-86304f8245d6",
  110: "ed4065e7-c20f-42f5-9830-95440935e3af",
  111: "dd08fde7-1051-4aeb-b914-46497d969425",
  112: "2e8fd879-e341-47ab-a65c-de03c5f3bcb6",
  113: "6eb1bdf5-6787-4d72-a27b-c2caaa36383d",
  114: "01a4b6a8-ca0f-4a88-80fd-79bbc83bb87a",
  115: "984c3963-8f71-4271-8b9d-5b324b87736e",
  116: "f4975e46-310a-43b5-9a61-c1e795b4c38b",
  117: "80ca3e1b-8c92-4761-8c18-da38b7e99449",
  118: "06da499b-42f9-4ea9-9796-8a5b63bb5c02",
  119: "468778ec-1731-44a7-8b5b-38ae84734cd0",
  120: "88be0820-8354-44f4-ac99-453a0d676b43",
  121: "23afdc4f-3066-4a4b-81f5-685373387233",
  122: "00c3a253-98bc-4926-b5d1-94bb7ca9d0e3",
  123: "4511c883-9894-411a-83b4-f3b09cd7eec6",
  124: "1611ac49-b1ac-4d03-9312-aea1fac12e55",
  125: "6fc704cd-4884-4cc6-a694-5d82b24c4247",
  126: "7a8b6bc7-7e66-4bbf-bcc8-b991d1713fcc",
  127: "10241c7b-4dc7-4c24-8dd0-f44e50fb7afd",
  128: "6243aca5-4393-4d4f-bfbc-3fe53a43559e",
  129: "6d7fd7db-4e0e-4907-8660-a36892a02ae9",
  130: "3ab405e5-ae7d-42d5-b22f-f03c3fe4fbee",
  131: "879804c4-50f5-41a0-9544-977fcc48fc38",
  132: "8a245079-faa9-40a7-bca4-af84d89413d8",
  133: "5ce2da9d-676b-41f0-ac9c-c0fba626b898",
  134: "154ff7a3-145e-4f1a-aa45-9f42af345522",
  135: "85151525-e2de-449c-a702-c8969af0ef4b",
  136: "ff8636c0-6399-4da9-a4c7-c17d8e5c931f",
  137: "99070c59-18ad-4a38-b960-1c8e3e29d7f3",
  138: "e9f0ea1b-0152-409a-82a8-75d8250bce78",
  139: "ef7b17b1-269f-4a96-8e70-818ac12be36d",
  140: "1128d71a-7300-452e-9d4c-1bfa663ec7da",
  141: "1718c4c3-b065-45f3-86db-7817682c0506",
  142: "d94a01cf-e6af-44ea-bf29-d0c0c56d55de",
  143: "1ff25b67-c5ad-488e-a5fa-ae3dae21ffc1",
  144: "9483e7e4-5e70-4f8f-a686-5a47d1844563",
  145: "9a0f0ac1-407c-4269-b65e-f645048604c9",
  146: "f4169c0f-ff7a-42e3-9764-4ea1a8957234",
  147: "9bb569b7-d13f-4a24-9ea1-ba50dfd3fb32",
  148: "af00576d-7441-4b87-8e00-246dd691c3c6",
  149: "8fac2b86-5969-4e16-9137-c34b38900273",
  150: "35a641f3-2f75-4211-bbbc-f8d97536547e",
  151: "6f653695-3dae-488b-b172-90d520edf96f",
  152: "a7325560-cb9a-4492-b241-a62173f16a34",
  153: "c24835e8-2e00-4ab0-87a6-efe4378bde6c",
  154: "9d16979b-caa8-4380-a984-96c4a6fa5d33",
  155: "4915fd7b-cb82-4035-93d8-4fcbc317dc56",
  156: "c2dd02c5-bed8-4b35-8bdc-125cb8867377",
  157: "ba55801b-4679-49ca-a66e-e9476f51e7ee",
  158: "fdabc01b-6246-4837-a7b0-5b6c9808a9a1",
  159: "8c8f6466-db45-4495-8d1a-0ebcbd3131f7",
};

// LawHub deep-link for a given PrepTest + section number (1-4). Falls back to the
// module (whole-test) link when the section is unknown, and null when the PT
// isnt in the table.
export function lawhubLink(preptest, section) {
  const uuid = PT_MODULES[preptest];
  if (!uuid) return null;
  const base = `https://app.lawhub.org/`;
  if (section >= 1 && section <= 4) return `${base}section/${uuid}/Section%20${section}`;
  return `${base}module/${uuid}`;
}
