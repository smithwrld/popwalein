import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { clients } from '@/data/clients';
import { TermsCondition } from '@/lib/quotationApi';

export interface PdfSelectionItem {
  parameterName: string;
  productName: string;
  pricePerSqft?: number;
  totalCost?: number;
}

export interface PdfPayload {
  quotationNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  projectLocation: string;
  projectType: string;
  areaSqft: string;
  description: string;
  serviceName: string;
  selections: PdfSelectionItem[];
  labourRate?: number;
  labourCost?: number;
  transportRate?: number;
  transportCost?: number;
  totalMaterialCost?: number;
  totalRatePerSqft?: number;
  totalAmount?: number;
  dateString?: string;
}

/**
 * Utility to generate a high-quality 3-page PDF quotation with commercial breakdown,
 * fixed charges, total + GST, and client / POP WALE signature spaces.
 */
export async function generateQuotationPdf(
  payload: PdfPayload,
  terms: TermsCondition[]
): Promise<void> {
  const dateString = payload.dateString || new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const areaSqftNum = Math.max(0, parseFloat(payload.areaSqft) || 0);
  const labourRate = payload.labourRate !== undefined ? payload.labourRate : 17;
  const transportRate = payload.transportRate !== undefined ? payload.transportRate : 2;

  // Compute breakdown if not directly provided
  let calculatedMaterialCost = 0;
  let calculatedMaterialRate = 0;

  const itemizedSelections = payload.selections.map((sel) => {
    const rate = sel.pricePerSqft !== undefined ? sel.pricePerSqft : 0;
    calculatedMaterialRate += rate;
    const cost = sel.totalCost !== undefined ? sel.totalCost : Math.round(rate * areaSqftNum * 100) / 100;
    calculatedMaterialCost += cost;
    return {
      ...sel,
      pricePerSqft: rate,
      totalCost: cost,
    };
  });

  const totalLabourCost = payload.labourCost !== undefined ? payload.labourCost : Math.round(labourRate * areaSqftNum * 100) / 100;
  const totalTransportCost = payload.transportCost !== undefined ? payload.transportCost : Math.round(transportRate * areaSqftNum * 100) / 100;
  const totalMaterialCost = payload.totalMaterialCost !== undefined ? payload.totalMaterialCost : calculatedMaterialCost;

  const totalRatePerSqft = payload.totalRatePerSqft !== undefined
    ? payload.totalRatePerSqft
    : (calculatedMaterialRate + labourRate + transportRate);

  const totalAmount = payload.totalAmount !== undefined
    ? payload.totalAmount
    : (totalMaterialCost + totalLabourCost + totalTransportCost);

  const totalAmountFormatted = totalAmount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: totalAmount % 1 !== 0 ? 2 : 0,
  });

  // Create temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '800px';
  container.style.backgroundColor = '#f3f4f6';

  // Common Header Template HTML
  const getHeaderHtml = (pageNumber: number) => `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 18px;">
      <div>
        <h1 style="font-size: 26px; font-weight: 700; color: #1e3a8a; margin: 0; letter-spacing: -0.02em; font-family: 'Neue Haas', sans-serif;">Popwale</h1>
        <p style="font-size: 10px; color: #64748b; margin: 2px 0 0 0; letter-spacing: 0.06em; text-transform: uppercase; font-family: 'Neue Haas', sans-serif; font-weight: 500;">Premium Ceiling & Interior Solutions</p>
      </div>
      <div style="text-align: right; font-family: 'Neue Haas', sans-serif;">
        <p style="font-size: 11px; font-weight: 600; color: #0f172a; margin: 0;">Quotation ref: <span style="color: #1d4ed8;">#${payload.quotationNumber}</span></p>
        <p style="font-size: 10px; color: #64748b; margin: 2px 0 0 0;">Date: ${dateString}</p>
      </div>
    </div>
  `;

  // Common Footer Template HTML
  const getFooterHtml = (pageNumber: number) => `
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 9px; color: #94a3b8; font-family: 'Neue Haas', sans-serif;">
      <div>
        <span>📍 Rajkot, Gujarat, India</span>
        <span style="margin: 0 8px;">|</span>
        <span>📞 +91 99090 94033</span>
        <span style="margin: 0 8px;">|</span>
        <span>📧 contact@popwale.in</span>
        <span style="margin: 0 8px;">|</span>
        <span>🌐 popwale.in</span>
      </div>
      <div style="font-weight: 500; color: #64748b;">Page ${pageNumber} of 3</div>
    </div>
  `;

  // Helper to create page container with A4 aspect ratio (800px x 1130px)
  const createPageWrapper = () => {
    const page = document.createElement('div');
    page.style.width = '800px';
    page.style.height = '1130px';
    page.style.padding = '42px 48px';
    page.style.boxSizing = 'border-box';
    page.style.backgroundColor = '#ffffff';
    page.style.display = 'flex';
    page.style.flexDirection = 'column';
    page.style.justifyContent = 'space-between';
    page.style.position = 'relative';
    return page;
  };

  // --------------------------------------------------
  // PAGE 1: Commercial Quotation Breakdown, Total + GST & Signatures
  // --------------------------------------------------
  const page1 = createPageWrapper();
  page1.innerHTML = `
    ${getHeaderHtml(1)}
    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-start; gap: 14px; font-family: 'Neue Haas', sans-serif;">
      
      {/* Client & Site Details */}
      <div>
        <h2 style="font-size: 13px; font-weight: 700; color: #1e3a8a; margin: 0 0 8px 0; border-bottom: 2px solid #1e3a8a; padding-bottom: 3px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em;">Client & Project Details</h2>
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; font-size: 11px; line-height: 1.5; color: #334155; background-color: #f8fafc; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div>
            <p style="margin: 2px 0;"><span style="color: #64748b; font-weight: 400;">Customer Name:</span> <span style="font-weight: 600; color: #0f172a;">${payload.customerName}</span></p>
            <p style="margin: 2px 0;"><span style="color: #64748b; font-weight: 400;">Phone Number:</span> <span style="font-weight: 600; color: #0f172a;">${payload.customerPhone}</span></p>
            <p style="margin: 2px 0;"><span style="color: #64748b; font-weight: 400;">Email Address:</span> <span style="font-weight: 600; color: #0f172a;">${payload.customerEmail || '—'}</span></p>
          </div>
          <div>
            <p style="margin: 2px 0;"><span style="color: #64748b; font-weight: 400;">Location:</span> <span style="font-weight: 600; color: #0f172a;">${payload.projectLocation}</span></p>
            <p style="margin: 2px 0;"><span style="color: #64748b; font-weight: 400;">Space Type:</span> <span style="font-weight: 600; color: #0f172a; text-transform: capitalize;">${payload.projectType || '—'}</span></p>
            <p style="margin: 2px 0;"><span style="color: #64748b; font-weight: 400;">Total Area:</span> <span style="font-weight: 700; color: #1d4ed8;">${payload.areaSqft ? `${payload.areaSqft} sq.ft` : '—'}</span></p>
          </div>
        </div>
      </div>

      {/* Selected Service */}
      <div style="display: flex; align-items: center; justify-content: space-between; background-color: #f1f5f9; padding: 6px 12px; border-radius: 6px;">
        <span style="font-size: 11px; color: #475569; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em;">Selected Ceiling Service:</span>
        <span style="font-size: 12px; font-weight: 700; color: #0f172a;">${payload.serviceName}</span>
      </div>

      {/* Commercial Breakdown Table */}
      <div>
        <h2 style="font-size: 13px; font-weight: 700; color: #1e3a8a; margin: 0 0 6px 0; border-bottom: 2px solid #1e3a8a; padding-bottom: 3px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em;">Itemized Quotation Breakdown</h2>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 10.5px; text-align: left; margin-top: 4px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1.5px solid #cbd5e1; font-weight: 600; color: #475569;">
              <th style="padding: 7px 10px; width: 22%;">Component / Scope</th>
              <th style="padding: 7px 10px; width: 34%;">Specification / Description</th>
              <th style="padding: 7px 10px; width: 14%; text-align: right;">Rate (₹/sqft)</th>
              <th style="padding: 7px 10px; width: 13%; text-align: right;">Area (sqft)</th>
              <th style="padding: 7px 10px; width: 17%; text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${itemizedSelections.map((sel, idx) => `
              <tr style="border-bottom: 1px solid #f1f5f9; background-color: ${idx % 2 === 0 ? '#ffffff' : '#fafafa'};">
                <td style="padding: 7px 10px; color: #334155; font-weight: 600;">${sel.parameterName}</td>
                <td style="padding: 7px 10px; color: #0f172a;">${sel.productName}</td>
                <td style="padding: 7px 10px; color: #475569; text-align: right; font-weight: 500;">₹${sel.pricePerSqft.toFixed(2)}</td>
                <td style="padding: 7px 10px; color: #475569; text-align: right;">${areaSqftNum > 0 ? `${areaSqftNum}` : '—'}</td>
                <td style="padding: 7px 10px; color: #0f172a; font-weight: 600; text-align: right;">₹${sel.totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            `).join('')}
            
            ${itemizedSelections.length === 0 ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 7px 10px; color: #334155; font-weight: 600;">Standard Ceiling</td>
                <td style="padding: 7px 10px; color: #0f172a;">Complete modular ceiling installation specifications</td>
                <td style="padding: 7px 10px; color: #475569; text-align: right;">₹${calculatedMaterialRate.toFixed(2)}</td>
                <td style="padding: 7px 10px; color: #475569; text-align: right;">${areaSqftNum}</td>
                <td style="padding: 7px 10px; color: #0f172a; font-weight: 600; text-align: right;">₹${totalMaterialCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            ` : ''}

            {/* Fixed Labour Charge */}
            <tr style="border-bottom: 1px solid #e2e8f0; background-color: #fefce8;">
              <td style="padding: 7px 10px; color: #854d0e; font-weight: 700;">LABOUR CHARGE</td>
              <td style="padding: 7px 10px; color: #713f12; font-size: 10px;">Skilled ceiling framing, fixing, jointing & finishing workmanship</td>
              <td style="padding: 7px 10px; color: #854d0e; text-align: right; font-weight: 700;">₹${labourRate.toFixed(2)}</td>
              <td style="padding: 7px 10px; color: #854d0e; text-align: right;">${areaSqftNum > 0 ? `${areaSqftNum}` : '—'}</td>
              <td style="padding: 7px 10px; color: #854d0e; font-weight: 700; text-align: right;">₹${totalLabourCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>

            {/* Fixed Transportation Charge */}
            <tr style="border-bottom: 1.5px solid #cbd5e1; background-color: #f0fdf4;">
              <td style="padding: 7px 10px; color: #166534; font-weight: 700;">TRANSPORTATION</td>
              <td style="padding: 7px 10px; color: #14532d; font-size: 10px;">Material loading, logistics, transit safety & site dispatch</td>
              <td style="padding: 7px 10px; color: #166534; text-align: right; font-weight: 700;">₹${transportRate.toFixed(2)}</td>
              <td style="padding: 7px 10px; color: #166534; text-align: right;">${areaSqftNum > 0 ? `${areaSqftNum}` : '—'}</td>
              <td style="padding: 7px 10px; color: #166534; font-weight: 700; text-align: right;">₹${totalTransportCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TOTAL AMOUNT BOX - EXACT SPECIFICATION MATCHING USER'S IMAGE */}
      <div style="margin-top: 6px; padding: 14px 18px; background-color: #f8fafc; border: 1.5px solid #94a3b8; border-radius: 10px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-size: 13px; font-weight: 700; color: #2563eb; letter-spacing: 0.05em; text-transform: uppercase;">
            TOTAL AMOUNT
          </div>
          <div style="margin-top: 5px; display: flex; align-items: baseline; gap: 8px;">
            <span style="font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
              ₹ ${totalAmountFormatted}
            </span>
            <span style="font-size: 11px; font-weight: 600; color: #64748b; font-style: italic;">
              +GST
            </span>
          </div>
        </div>

        <div style="text-align: right; font-size: 10.5px; color: #475569; line-height: 1.5;">
          <div>Effective Rate: <strong style="color: #0f172a;">₹${totalRatePerSqft.toFixed(2)} / sq.ft</strong></div>
          <div>Total Area: <strong style="color: #0f172a;">${payload.areaSqft ? `${payload.areaSqft} sq.ft` : '—'}</strong></div>
        </div>
      </div>

      ${payload.description ? `
        <div style="background-color: #fafafa; border-left: 3px solid #1e3a8a; padding: 8px 12px; font-size: 10px; border-radius: 4px; margin-top: 2px;">
          <span style="font-weight: 600; color: #475569; display: block; margin-bottom: 2px; text-transform: uppercase; font-size: 9px;">Special Client Notes:</span>
          <span style="color: #1e293b; line-height: 1.3;">${payload.description}</span>
        </div>
      ` : ''}

      {/* SIGNATURE SPACES - MATCHING USER IMAGE */}
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 35px; padding: 0 5px;">
        <div style="width: 250px;">
          <p style="margin: 0 0 50px 0; font-size: 11px; font-weight: 700; color: #334155; font-style: italic; letter-spacing: 0.03em;">
            SIGNATURE (CUSTOMER)
          </p>
          <div style="border-bottom: 1.5px solid #475569; width: 100%;"></div>
        </div>
        
        <div style="width: 250px; text-align: right;">
          <p style="margin: 0 0 50px 0; font-size: 11px; font-weight: 700; color: #334155; font-style: italic; letter-spacing: 0.03em;">
            AUTHORIZED BY (P.O.P WALE)
          </p>
          <div style="border-bottom: 1.5px solid #475569; width: 100%;"></div>
        </div>
      </div>

    </div>
    ${getFooterHtml(1)}
  `;

  // --------------------------------------------------
  // PAGE 2: Client List Grid
  // --------------------------------------------------
  const page2 = createPageWrapper();
  page2.innerHTML = `
    ${getHeaderHtml(2)}
    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-start; gap: 15px; font-family: 'Neue Haas', sans-serif;">
      <div style="text-align: center; margin-bottom: 10px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #1e3a8a; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.05em;">Our Esteemed Clients</h2>
        <p style="font-size: 11px; color: #64748b; margin: 0 auto; max-width: 500px; font-weight: 400; line-height: 1.4;">
          We have successfully delivered quality false ceiling, gypsum partitions, and plastering solutions for premium commercial projects, corporate environments, and leading local brands.
        </p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 10px; width: 100%;">
        ${clients.slice(0, 16).map(client => `
          <div style="border: 1px solid #f1f5f9; border-radius: 12px; padding: 10px; background-color: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 110px; box-sizing: border-box; text-align: center;">
            <div style="height: 55px; display: flex; align-items: center; justify-content: center; margin-bottom: 6px; width: 100%;">
              ${client.logo ? `
                <img src="${client.logo}" alt="${client.name}" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
              ` : `
                <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #f1f5f9; color: #1e3a8a; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;">
                  ${client.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
              `}
            </div>
            <span style="font-size: 9px; font-weight: 600; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; display: block;">${client.name}</span>
            <span style="font-size: 8px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; font-weight: 400; display: block; margin-top: 1px;">${client.type}</span>
          </div>
        `).join('')}
      </div>
    </div>
    ${getFooterHtml(2)}
  `;

  // --------------------------------------------------
  // PAGE 3: Terms & Conditions & Sign-off
  // --------------------------------------------------
  const page3 = createPageWrapper();
  page3.innerHTML = `
    ${getHeaderHtml(3)}
    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 20px; font-family: 'Neue Haas', sans-serif;">
      <div>
        <h2 style="font-size: 15px; font-weight: 700; color: #1e3a8a; margin: 0 0 15px 0; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em;">Terms & General Conditions</h2>
        <ul style="padding-left: 18px; font-size: 11px; line-height: 1.8; color: #334155; margin: 0; font-weight: 400;">
          ${terms.map(t => `
            <li style="margin-bottom: 12px; padding-left: 4px;">
              <span style="font-weight: 500; color: #0f172a;">${t.bullet_point}</span>
            </li>
          `).join('')}
        </ul>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
        <div style="font-size: 10px; color: #64748b; line-height: 1.4;">
          <p style="margin: 0; font-weight: 600; color: #475569; text-transform: uppercase; font-size: 9px; letter-spacing: 0.02em;">Prepared By:</p>
          <p style="margin: 15px 0 0 0; font-weight: 700; font-size: 12px; color: #0f172a;">Popwale Ceiling Contractors</p>
          <p style="margin: 2px 0 0 0; font-weight: 400;">Rajkot Office Estimation Unit</p>
        </div>
        
        <div style="text-align: right; font-size: 10px; color: #64748b; line-height: 1.4;">
          <p style="margin: 0; font-weight: 600; color: #475569; text-transform: uppercase; font-size: 9px; letter-spacing: 0.02em;">Corporate Seal & Verification:</p>
          <div style="width: 160px; border-bottom: 1px dashed #cbd5e1; height: 30px; margin-left: auto;"></div>
          <p style="margin: 6px 0 0 0; font-weight: 400;">Authorized Stamp</p>
        </div>
      </div>
    </div>
    ${getFooterHtml(3)}
  `;

  // Append pages to container
  container.appendChild(page1);
  container.appendChild(page2);
  container.appendChild(page3);
  document.body.appendChild(container);

  try {
    const options = {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    };

    const canvas1 = await html2canvas(page1, options);
    const canvas2 = await html2canvas(page2, options);
    const canvas3 = await html2canvas(page3, options);

    // Assemble PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [800, 1130]
    });

    const img1 = canvas1.toDataURL('image/jpeg', 0.95);
    pdf.addImage(img1, 'JPEG', 0, 0, 800, 1130);

    pdf.addPage([800, 1130]);
    const img2 = canvas2.toDataURL('image/jpeg', 0.95);
    pdf.addImage(img2, 'JPEG', 0, 0, 800, 1130);

    pdf.addPage([800, 1130]);
    const img3 = canvas3.toDataURL('image/jpeg', 0.95);
    pdf.addImage(img3, 'JPEG', 0, 0, 800, 1130);

    // Save
    pdf.save(`Popwale_Quotation_${payload.quotationNumber}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('PDF compilation failed. Please try again.');
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
