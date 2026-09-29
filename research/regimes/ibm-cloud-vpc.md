# IBM Cloud VPC — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Gen 3/Flex US-South list | On demand; OfficialUSD Global Catalog Instance-Hour metric, effective 2026-09-01 through 2026-09-30; boot volume extra. No monthly cap inferred. | cxf-4x 8: $0.171/h; cap None | https://www.ibm.com/products/virtual-servers/pricing |
| Flex 50% baseline | On demand; OfficialUSD Global Catalog Instance-Hour metric, effective 2026-09-01 through 2026-09-30; boot volume extra. 50%CPU baseline: not same sustained performance as ordinary VSI. | cxf-4x 8: $0.1014/h; cap None | https://www.ibm.com/products/virtual-servers/pricing |
| Catalog spot rate reference | On demand; OfficialUSD Global Catalog Instance-Hour metric, effective 2026-09-01 through 2026-09-30; boot volume extra. Spot may be interrupted and selected price changes. | cxf-4x 8: $0.042602/h; cap None | https://www.ibm.com/products/virtual-servers/pricing |
| Reserved VPC capacity | 1 or 3 years; No verified selected reservation tariff. | Rate unavailable; null (not free) | https://www.ibm.com/products/virtual-servers/pricing |
## Billing details
- **granularity_seconds**: 1
- **minimum_billed_seconds**: Unknown; not assumed zero.
- **setup_fee_usd**: Unknown; not assumed zero.
- **api**: True
- **cli**: True
- **ipv 6**: Unknown; not assumed zero.
- **ingress_usd**: Unknown; not assumed zero.
- **cpu**: VPC multi-tenant Instance-Hour Gen 3/Flex profiles; 50%burstable and spot are separate.
- **minimum_term**: Per-second PAYG, no monthlycap; reservedcommitment separate.
- **backup**: US-South snapshot storage 0.00007177 USD/GB-hour; fastrestore extra 0.79159 USD/instance-hour. Generalpurposeblock 0.00012025 USD/GB-hour.
- **ipv 4**: Catalog floatingIP metric 0.006 USD/Instance; time dimension not clear in API metadata, so monthly price leftnull.
- **provisioning**: Marketing claims 1000VSIs in 4minutes, not a measured single-instanceAPIlatency.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- PublicHTML calculator pricing unavailable, but official Global Catalog API recovered exact Instance-Hour listprices. Flex bxf-4x 16 is 0.193 USD/hour; burstable 50%baseline 0.1311; catalogspot 0.048167. These are 4 vCPU/16 GiB shapes, not 4/8.
- Source metrics in Gen 2profilecatalog label aggregatedCPU/RAM ambiguously; they are preservedraw but not multiplied into a fabricated bill. Current Gen 3/Flex Instance-Hour metrics avoid that ambiguity.
- Catalog effective window is September 1–30,2026. Re-fetch for laterperiods. SelectedregionalUSD rates; not a globalratepromise.
- Egressfirstpaidtier 0.091824 USD/GB; cardmodelsno freeallowance conservatively. PublicfloatingIP andgateway total remainsunknown until meteringunits verified.
- StoppedVSI compute can suspendbilling; bootdisks, snapshots andotherallocatedresources remainbillable.
- Requestedexample 4/8 uses captured>=4/8 shape; no third-party price substituted. All taxes excluded.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Gen 3/Flex US-South list | $1,504.80 | $6,241.50 |
| Flex 50% baseline | $892.32 | $3,701.10 |
| Catalog spot rate reference | $374.90 | $1,554.97 |
| Reserved VPC capacity | Unknown / unavailable | Unknown / unavailable |
Snapshot subtotal: $2.6196; rate $0.0523921/GiB-month. Egress: see allowances, pooling/accrual and rate $0.091824/GiB; not every mode has the same allowance.
Powered-off compute billed: False. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.ibm.com/products/virtual-servers/pricing
- https://cloud.ibm.com/docs/vpc?topic=vpc-pricing-for-vpc
- https://cloud.ibm.com/docs/vpc?topic=vpc-managing-virtual-server-instances
- https://globalcatalog.cloud.ibm.com/api/v1/95bd1098-b468-4d9f-9a4a-d48b80d41d95:us-south40097/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/c42113cb-8e74-4da9-bd6c-ff72f1a928f4:us-south32539/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/04991f9d-562f-4293-a178-86cab5fccb68:us-south97469/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/83280fe6-77fc-4c61-9fdf-9a607fd1626f:us-south26393/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/2cfeee63-cf4e-41c5-b71e-2a6d84b9d1ab:us-south65646/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/3dd7995f-0e36-4091-80f2-dbb93ec8f70f:us-south88808/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/f4c69506-b6db-46fe-95bf-5e22ffb8f02a:us-south69000/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/6a659325-c4cb-4bfa-b22d-6a8e637c1883:us-south77855/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/af19b5ac-464f-494b-8130-cb334cfddea9:us-southb5160804/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/938429fa-a144-49ff-aeef-6ba5aadd6e1d:us-south863416db/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/4c43501d-0e23-4192-9fd9-18c14f361819:us-south210df2dc/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/b9522965-f570-4ad5-bc82-e07a2156e047:us-south3251899e/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/8e3e581c-d0c2-4220-8bb4-6ee3482f14d7:us-southcfde5a27/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/1c4f8b6c-2dbd-4d55-868a-a6f3195e46b3:us-southcc414e3a/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/ce2882db-e394-4c89-9e39-6e4ca2194f00:us-south193f8523/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/b9511f31-9b16-458f-9acf-c493819d3548:us-south3684efb4/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/7832a446-dab4-4fa6-bdd0-2fe7a19a08e0:us-south1ecaef3c/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/d913d2bf-5b1b-4ce0-ab15-a70327b9f2d5:us-south9ad6d98b/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/51c2d4b0-63ce-4a28-8bcb-be06147e6924:us-south13beca50/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/c08688e7-db7a-450e-a738-7e9aff65b426:us-southde0c3c68/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/230d967b-2573-4eff-b036-c3a95b9d13cc:us-south1b5fc115/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/b2cfd5f2-7227-4f96-a540-1d12e3b60bdf:us-southd9cb8957/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/af067159-6da8-483e-978f-bdf012a690ea:us-southb09391aa/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/00cdfd69-32b9-44bc-b6d3-e40c204a9192:us-south78a5521d/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/d3f65e29-ebdd-42c8-b9b2-2fa376fb37d9:us-south69783e1d/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/7c3c7e82-d570-4ea9-aca5-6f2fc0f5a979:us-south67228d96/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/65559a47-75de-409e-9dba-d4164ff096fb:us-southd027b174/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/5a66bab5-72cf-4b35-b8fc-ee4fd043400a:us-south76b99875/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/7f41da31-ae65-483e-85bb-08dcea2d7e81:us-southc8961c7c/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/296b2511-5670-485e-a2f8-fda14604b809:us-south93dfce79/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/fd80b3da-edcb-42b9-9727-5987eede1dfb:us-southbbe36862/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/5ea33e79-3a23-4fa2-832c-6cd1e1635430:us-south6643ab34/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/69be454a-69e4-4fe2-a302-11f28533410d:us-southf1585126/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/03cc624d-5b9c-4834-8e64-d4c37a82a7af:us-southa17074fb/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/4d370244-45c7-4e65-a070-6e29b042f7a3:us-south7b94bee4/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/3d82cd0f-cb5d-4e2d-95ae-a15502c6181e:us-southd9f7bb65/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/419874e9-d2df-4a25-92d5-15a90bc495a0:us-southc4ec3801/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/63914630-34db-4ca1-97da-996834114f6d:us-south14226cea/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/e5197e83-5ddb-4c81-9dd2-18353e1878bc:us-southf472e7e2/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/e508f604-99b6-4f89-adf6-148436dccd8c:us-south52aca84a/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/0638c843-9882-42d8-8935-acb4f0faf2e9:us-south61232/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/9da0e9fd-fc64-4e51-93f7-f0eb5ee71aa7:us-south38590/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/24a15c33-b90a-45e2-b5b8-a1daa8c5a9c6:us-south90922/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/6a445f62-f4d7-4daf-b02b-fc0d5f46abb2:us-south20250/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/c33a5afe-33d1-4f47-83f7-df88334554c7:us-south78766/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/a8ae2fe1-6f40-46fb-a6bd-65be1642cce4:us-south75914/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/8d23087a-09dd-4b19-85fe-79176a0a3d4e:us-south98868/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/ff8e7335-35de-4c80-8eca-d1a68e37fda8:us-south78379/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/aaf21379-f41f-4ef8-8a39-6cfa8182349a:us-south7a5aec38/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/ad44ba0d-1c0a-4a45-901c-774108625820:us-southdbfbcf67/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/bd23beee-daec-43a8-b879-884471a18e3c:us-south9bb602db/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/fe159b80-3fd7-488b-9d74-da39458a3767:us-south8dcea40c/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/a8868aae-0aeb-468c-b044-d0a3b82d576c:us-south3a61d62a/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/7fa18a5f-5fcf-49f1-84e6-6be23b4fa5c9:us-south3333af47/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/cf28b8cd-503f-435d-a7da-8862e32e85d4:us-south1928fea6/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/fbeaf243-82f0-495a-aacc-0850a7a8a605:us-south64ece85a/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/9d81e4e0-2b28-41bc-a1e5-ec083d0253dd:us-south4bbad927/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/dc94b743-202e-4703-b9ac-ab5766a110fc:us-south1b017bda/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/af226b23-fc9f-4e55-93cb-334cbb3f77ce:us-south61a8c52f/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/e22ae7c6-724c-4e46-852b-3f26ff764f0d:us-south14a6c834/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/9b74f9b5-60a1-49c3-a767-230d76fe0333:us-south92053c96/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/937ed1e8-2238-41af-a9cb-914580a1ec31:us-southfb0f157b/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/6fa0dcb2-dc40-4b10-8f8f-f1c0dac2416b:us-south979c4710/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/66bbdcc4-ffb3-4737-b432-0090c6065f97:us-southe844ee10/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/33a14c33-4ec4-4a9f-bac1-5663573f7d2d:us-south593b756f/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/958dc5a3-f6ab-46cb-8657-2b1118e3cc00:us-southc56a0480/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/7f5bc462-f93e-46e2-9eb0-729a250cf009:us-south23562de9/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/adf81a26-341a-4c85-8994-3179bb6033e9:us-southbed7febd/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/69968414-a633-4fcc-ac03-03669c75695c:us-south98159b93/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/69040b98-0ff3-47a0-a276-2b75742e35b0:us-southdc9ed13c/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/5b1e5b86-0cd8-42db-aae7-a5f53e5d760c:us-southe0b1628b/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/1613940b-0f07-46cd-9038-675b67a122dd:us-southd944bdcd/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/43a745fe-b61d-4016-a8b6-f40604b2c9e7:us-south37631d92/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/4bbc9798-db7c-4d58-ae32-ff65fe62bba9:us-south9d3ca434/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/e80354e7-fb74-4107-a810-25ac9b2aaef0:us-southcc91b691/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/03a98d49-4eab-45af-b143-58f60351e145:us-south2ff7b64e/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/4bc1499c-f54a-4aa5-8b5f-e6c88b2165ac:us-south3507d560/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/e562c9e9-bbc3-4297-a0b7-7019494f94e6:us-south52afac8c/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/1f92b41b-6f9f-4586-8fcd-2911d9fe3c41:us-southd5248973/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/7a82d744-ff7b-44a3-9e6c-84dbc6e9fe4c:us-south9bb9ede6/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/ce1180f7-c570-4541-9345-d13d5a8d9439:us-southdf341f59/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/f2a593e0-a3bd-4a69-a1af-3d4f764b1b72:us-southbd98c224/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/f2ef7b54-253f-4205-ac7a-d448eb04bf5f:us-south83e8e83c/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/38e79c3a-7e79-4e61-ac60-a367a0966647:us-southee39821b/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/9bb75523-4293-4954-b907-bc0328e35053:us-south0c4300d5/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/c6af0097-2eb5-477a-ad77-0b437f2565d4:us-south6f07d0ca/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/2fcaff9f-c3bb-48d8-b615-abf51110368e:us-south3c938b2d/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/a688e8a6-f7fd-4731-905b-fdcb647af690:us-south0bd70950/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/606394e8-9e33-4cf4-b9df-968b16465055:us-southb47450f8/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/88506b49-d197-43a0-83b3-259fe93df349:us-southebcb34f9/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/ae56a7a9-4c13-4bf2-ba8d-45f4feff1a15:us-southf8637d31/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/226f4add-fac0-4e34-9f45-789e1e6e4c1f:us-south20b147ca/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/d1892925-4252-49c9-9d9e-54fcbb6743af:us-southcdf9812e/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/cd802623-74d9-468b-b4a3-58413663caf4:us-south01d826c4/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/73213274-10b9-409b-80d8-ba7cd08c4bcb:us-south2b5ac404/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/e095af58-6d1b-4641-a936-f0f29e71f721:us-southf1b175b5/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/f94ce407-c726-470b-839f-3b2b719b38ca:us-south83829/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/0e32644c-e537-4f14-a8ce-7d43f9e463e3:us-south82492/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/dcaca9ff-8325-4024-8684-d2a09228bc0b:us-south58827/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/4af38078-7666-46bd-8266-eb5f9a639c26:us-south40796/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/2c887ea6-7cf8-4ee8-b9c1-14981ad03181:us-south83292/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/f5c411ff-8f57-4961-9f37-bd5acd301450:us-south73281/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/458469d5-66f7-487b-b35e-a88d47a5081c:us-south65805/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/a0818e78-f2be-47a0-99c9-a2115f5b6701:us-south99761/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/620f1b5e-7e91-4980-af77-ed87558557c8:us-south93e7b2a2/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/37775e75-ca9b-416e-a19f-fdb28b59e05b:us-south9ffac9d0/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/85924751-5ab1-41e4-80b4-8a72950f4b9e:us-southdb34f355/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/43448e93-b222-47d5-b35d-d8b4e5589f40:us-south6f8f7ae5/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/22a57704-ec43-4d44-98cf-4f7f52ab2607:us-south5e58831e/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/c5f8a627-5f48-432b-aef1-4f884504a62e:us-south2ecf3f0b/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/285adb6e-bedd-4209-9137-b648355d342c:us-south0ad960ff/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/56ee6257-6be9-4db8-bff0-6828aeec7ab2:us-southd738026e/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/df9a0e0e-a9f4-4879-88f1-d7d6ecf3f66a:us-south6229963f/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/d6457918-2ed0-43fa-9a1f-dc6e54634731:us-south75fa9f84/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/79951614-4057-4ae4-b44d-09a773e510a2:us-south30e83c36/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/e86aa74e-af76-472c-978d-d7a96924da46:us-southbb9d15ac/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/30f4a4ad-b390-42c5-a667-3f5c222d69b6:us-southd4533650/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/92c8079e-fe8c-4f85-8dc3-672637c86306:us-southf25283e0/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/980b3217-f59f-4252-9c1c-d8f53c66419a:us-south9e3d54b0/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/0ec99d58-bed7-4934-bb8f-222b4cf42d8f:us-south5ab68945/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/fa985510-52cb-4606-9574-04e6c9d8cca6:us-south6279d8e5/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/d87a3b8f-4a71-42e7-8a99-df68c902e422:us-southdb441184/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/b0891049-7948-494a-ae79-384beda3a9a0:us-south3fad0847/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/e49993e3-07ab-4c48-9fbd-6a558d949d0a:us-south361e1ed8/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/908cfd5f-d3be-4816-9c26-6a39ddee4dcc:us-south35c25381/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/0ce0e7e6-3830-41b7-993b-56a5f59966d4:us-southef34ad5c/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/034e7c61-28ef-481c-9516-eef0117e69cc:us-southcee9e1fa/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/1291693a-c249-42ee-a841-55556313386c:us-south07a98272/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/b98d4acf-f34e-4720-969a-d4f6c62d6620:us-southb20a87e9/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/96b21734-3306-414c-8b9f-06f8b62b6342:us-southc15af618/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/27822b49-dacb-4316-811d-9bdca356f7e4:us-southe13aadc0/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/afb3aa9b-b96d-4c3d-9f05-fac81c59aa82:us-southb594a81e/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/43b4bf08-3661-427d-a56f-a4a3e6ffa55b:us-south443317e9/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/db0af15b-d8af-4b5c-91cb-9a8f71a4b7ef:us-south7424ba04/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/1d8d9a87-c973-4a79-bd6c-5d7bfd94cf47:us-southa23c1fef/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/24615451-5ba7-45da-a845-6aa8218431f6:us-south4c7aa7cf/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/b87c3922-94cb-41bc-9359-37bc16cd1a8a:us-south0f7305ec/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/8d35126d-375a-4ed5-a42b-f865b597ed22:us-south8287f11b/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/613b27cd-aa2c-4f9b-9123-105cdb47be55:us-south2a6bba39/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/9f4041ff-b126-49a8-8233-1455f8bb5582:us-southdc86e6b5/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/50bfa602-3c3f-400b-845b-ecbe995c9f8a:us-south42b7bf27/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/2eb210c9-feaa-4faa-8f46-8792d6cf8c22:us-southd4aa4460/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/74a80442-144f-488f-85ee-f81150ff0169:us-south83972/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/4579dbd3-80bb-43dc-a645-ba3b03335cc9:us-south83479/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/f2362861-1c8b-4df3-8478-7b91330d2d25:us-south58402/pricing
- https://globalcatalog.cloud.ibm.com/api/v1/5c6f17b8-1be9-4ae8-a328-afbfe41b02f8:us-south79891/pricing