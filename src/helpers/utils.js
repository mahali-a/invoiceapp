import dateFormat from "dateformat";

export const createHTML1 = ({
  businessName,
  email,
  profile,
  client,
  invoiceNumber,
  invoiceDate,
  items,
  subtotal,
  tax,
  total,
  notes,
  signature,
}) => {
  return `
      <!DOCTYPE html> 
<!-- saved from url=(0014)about:internet -->
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <title>Example 2</title>
    <link rel="stylesheet" href="./Example 2_files/style.css" media="all">
    <style>
    @font-face {
      font-family: SourceSansPro;
      src: url(SourceSansPro-Regular.ttf);
    }
    
    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }
    
    a {
      color: #0087C3;
      text-decoration: none;
    }
    
    body {
      position: relative;
      width: 21cm;  
      height: 26cm;  
      margin: 0 auto; 
      color: #555555;
      background: #FFFFFF; 
      font-family: Arial, sans-serif; 
      font-size: 14px; 
      font-family: SourceSansPro;
    }
    
    header {
      padding: 10px 0;
      margin-bottom: 20px;
      border-bottom: 1px solid #AAAAAA;
    }
    
    #logo {
      float: left;
      margin-top: 8px;
    }
    
    #logo img {
      height: 100px;
      width: 100px
    }

      .signature img{
        width: 120px;
        heigth: 80px;
      }
    
    #company {
      float: right;
      text-align: right;
    }
    
    
    #details {
      margin-bottom: 50px;
    }
    
    #client {
      padding-left: 6px;
      border-left: 6px solid #0087C3;
      float: left;
    }
    
    #client .to {
      color: #777777;
    }
    
    h2.name {
      font-size: 1.4em;
      font-weight: normal;
      margin: 0;
    }
    
    #invoice {
      float: right;
      text-align: right;
    }
    
    #invoice h1 {
      color: #0087C3;
      font-size: 2.4em;
      line-height: 1em;
      font-weight: normal;
      margin: 0  0 10px 0;
    }
    
    #invoice .date {
      font-size: 1.1em;
      color: #777777;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;
    }
    
    table th,
    table td {
      padding: 20px;
      background: #EEEEEE;
      text-align: center;
      border-bottom: 1px solid #FFFFFF;
    }
    
    table th {
      white-space: nowrap;        
      font-weight: normal;
    }
    
    table td {
      text-align: right;
    }
    
    table td h3{
      color: #57B223;
      font-size: 1.2em;
      font-weight: normal;
      margin: 0 0 0.2em 0;
    }
    
    table .no {
      color: #FFFFFF;
      font-size: 1.6em;
      background: #57B223;
    }
    
    table .desc {
      text-align: left;
    }
    
    table .unit {
      background: #DDDDDD;
    }
    
    table .qty {
    }
    
    table .total {
      background: #57B223;
      color: #FFFFFF;
    }
    
    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.2em;
    }
    
    table tbody tr:last-child td {
      border: none;
    }
    
    table tfoot td {
      padding: 10px 20px;
      background: #FFFFFF;
      border-bottom: none;
      font-size: 1.2em;
      white-space: nowrap; 
      border-top: 1px solid #AAAAAA; 
    }
    
    table tfoot tr:first-child td {
      border-top: none; 
    }
    
    table tfoot tr:last-child td {
      color: #57B223;
      font-size: 1.4em;
      border-top: 1px solid #57B223; 
    
    }
    
    table tfoot tr td:first-child {
      border: none;
    }
    
    #thanks{
      font-size: 2em;
      margin-bottom: 50px;
    }
    
    #notices{
      padding-left: 6px;
      border-left: 6px solid #0087C3;  
    }
    
    #notices .notice {
      font-size: 1.2em;
    }
    
    footer {
      color: #777777;
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #AAAAAA;
      padding: 8px 0;
      text-align: center;
    }
    </style>
  </head>
  <body>
    <header class="clearfix">
      <div id="logo">
        <img src=${profile.logo}>
      </div>
      <div id="company">
        <h2 class="name">${businessName}</h2>
        <div><a href="mailto:${email}">${email}</a></div>
      </div>
      
    </header>
    <main>
      <div id="details" class="clearfix">
        <div id="client">
          <div class="to">INVOICE TO:</div>
          <h2 class="name">${client.fullname}</h2>
          <div class="address">${client.phoneNo}</div>
          <div class="email"><a href="mailto:${client.email}">${
    client.email
  }</a></div>
        </div>
        <div id="invoice">
          <h1>INVOICE ${invoiceNumber}</h1>
          <div class="date">Date of Invoice: ${dateFormat(
            invoiceDate,
            "dS mmmm yyyy"
          )}</div>
        </div>
      </div>
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="no">#</th>
            <th class="desc">DESCRIPTION</th>
            <th class="unit">UNIT PRICE</th>
            <th class="qty">QUANTITY</th>
            <th class="total">TOTAL</th>
          </tr>
        </thead>
        <tbody>
        ${items.map((currElement, index) => {
          return `<tr>
                <td class="no">0${index + 1}</td>
                <td class="desc"><h3>${currElement.description}</h3></td>
                <td class="unit">GHS ${currElement.price}</td>
                <td class="qty">${currElement.quantity}0</td>
                <td class="total">GHS ${
                  currElement.price * currElement.quantity
                }</td>
              </tr>`;
        })}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"></td>
            <td colspan="2">SUBTOTAL</td>
            <td>GHS ${subtotal}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td colspan="2">TAX</td>
            <td>GHS ${tax}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td colspan="2">GRAND TOTAL</td>
            <td>GHS ${total}</td>
          </tr>
        </tfoot>
      </table>
            <div class="signature">
          <img src=${signature} />
        </div>
        <br />
      <div id="thanks">Thank you!</div>
      <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">${notes}.</div>
      </div>
    </main>
    <footer>
      Invoice was generated by Painter Rebuplic Invoice App.
    </footer>
  
</body></html>
    `;
};

export const createHTML3 = ({
  businessName,
  email,
  profile,

  client,
  price,
  invoiceNumber,
  invoiceDate,
  items,
  subtotal,
  tax,
  total,
  notes,
  signature,
}) => {
  return `
    <!DOCTYPE html>
<html lang="en">
    <meta charset="utf-8" />
    <title>Aldona (black)</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta name="description" content="Invoicebus Invoice Template" />
    <meta name="author" content="Invoicebus" />

    <meta name="template-hash" content="ff0b4f896b757160074edefba8cfab3b" />

    <style>
            html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed,
      figure, figcaption, footer, header, hgroup,
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        font-size: 100%;
        vertical-align: baseline;
      }

      html {
        line-height: 1;
      }

      ol, ul {
        list-style: none;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      caption, th, td {
        text-align: left;
        font-weight: normal;
        vertical-align: middle;
      }

      q, blockquote {
        quotes: none;
      }
      q:before, q:after, blockquote:before, blockquote:after {
        content: "";
        content: none;
      }

      a img {
        border: none;
      }

      article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
        display: block;
      }

      /* Invoice styles */
      /**
       * DON'T override any styles for the <html> and <body> tags, as this may break the layout.
       * Instead wrap everything in one main <div id="container"> element where you may change
       * something like the font or the background of the invoice
       */
      html, body {
        /* MOVE ALONG, NOTHING TO CHANGE HERE! */
      }

      /**
       * IMPORTANT NOTICE: DON'T USE '!important' otherwise this may lead to broken print layout.
       * Some browsers may require '!important' in oder to work properly but be careful with it.
       */
      .clearfix {
        display: block;
        clear: both;
      }

        .signature img{
        width: 120px;
        heigth: 80px;
      }

      .hidden {
        display: none;
      }

      b, strong, .bold {
        font-weight: bold;
      }

      #container {
        font: normal 13px/1.4em 'Open Sans', Sans-serif;
        margin: 0 auto;
        min-height: 1078px;
      }

      .invoice-top {
        background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIxMCUiIHN0b3AtY29sb3I9IiMzMzMzMzMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIiAvPjwvc3ZnPiA=');
        background: -moz-radial-gradient(center center, circle farthest-corner, #333333 10%, #000000);
        background: -webkit-radial-gradient(center center, circle farthest-corner, #333333 10%, #000000);
        background: radial-gradient(circle farthest-corner at center center, #333333 10%, #000000);
        color: #fff;
        padding: 40px 40px 30px 40px;
      }

      .invoice-body {
        padding: 50px 40px 40px 40px;
      }

      #memo .logo {
        float: left;
        margin-right: 20px;
      }
      #memo .logo img {
        width: 150px;
        height: 150px;
      }
      #memo .company-info {
        float: right;
        text-align: right;
      }
      #memo .company-info .company-name {
        color: #F8ED31;
        font-weight: bold;
        font-size: 32px;
      }
      #memo .company-info .spacer {
        height: 15px;
        display: block;
      }
      #memo .company-info div {
        font-size: 12px;
        float: right;
        margin: 0 3px 3px 0;
      }
      #memo:after {
        content: '';
        display: block;
        clear: both;
      }

      #invoice-info {
        float: left;
        margin-top: 50px;
      }
      #invoice-info > div {
        float: left;
      }
      #invoice-info > div > span {
        display: block;
        min-width: 100px;
        min-height: 18px;
        margin-bottom: 3px;
      }
      #invoice-info > div:last-of-type {
        margin-left: 10px;
        text-align: right;
      }
      #invoice-info:after {
        content: '';
        display: block;
        clear: both;
      }

      #client-info {
        float: right;
        margin-top: 50px;
        margin-right: 30px;
        min-width: 220px;
      }
      #client-info > div {
        margin-bottom: 3px;
      }
      #client-info span {
        display: block;
      }
      #client-info > span {
        margin-bottom: 3px;
      }

      #invoice-title-number {
        margin-top: 30px;
      }
      #invoice-title-number #title {
        margin-right: 5px;
        text-align: right;
        font-size: 35px;
      }
      #invoice-title-number #number {
        margin-left: 5px;
        text-align: left;
        font-size: 20px;
      }

      table {
        table-layout: fixed;
      }
      table th, table td {
        vertical-align: top;
        word-break: keep-all;
        word-wrap: break-word;
      }

      #items .first-cell, #items table th:first-child, #items table td:first-child {
        width: 18px;
        text-align: right;
      }
      #items table {
        border-collapse: separate;
        width: 100%;
      }
      #items table th {
        font-weight: bold;
        padding: 12px 10px;
        text-align: right;
        border-bottom: 1px solid #444;
        text-transform: uppercase;
        font-size: 12px;
      }
      #items table th:nth-child(2) {
        width: 30%;
        text-align: left;
      }
      #items table th:last-child {
        text-align: right;
      }
      #items table td {
        border-right: 1px solid #b6b6b6;
        padding: 15px 10px;
        text-align: right;
      }
      #items table td:first-child {
        text-align: left;
        border-right: none !important;
      }
      #items table td:nth-child(2) {
        text-align: left;
      }
      #items table td:last-child {
        border-right: none !important;
      }

      #sums {
        float: right;
        margin-top: 30px;
      }
      #sums table tr th, #sums table tr td {
        min-width: 100px;
        padding: 10px;
        text-align: right;
        font-weight: bold;
        font-size: 14px;
      }
      #sums table tr th {
        text-align: left;
        padding-right: 25px;
        color: #707070;
      }
      #sums table tr td:last-child {
        min-width: 0 !important;
        max-width: 0 !important;
        width: 0 !important;
        padding: 0 !important;
        overflow: visible;
      }
      #sums table tr.amount-total th {
        color: black;
      }
      #sums table tr.amount-total th, #sums table tr.amount-total td {
        font-weight: bold;
      }
      #sums table tr.amount-total td:last-child {
        position: relative;
      }
      #sums table tr.amount-total td:last-child .currency {
        position: absolute;
        top: 3px;
        left: -740px;
        font-weight: normal;
        font-style: italic;
        font-size: 12px;
        color: #707070;
      }
      #sums table tr.amount-total td:last-child:before {
        display: block;
        content: '';
        border-top: 1px solid #444;
        position: absolute;
        top: 0;
        left: -740px;
        right: 0;
      }
      #sums table tr:last-child th, #sums table tr:last-child td {
        color: black;
      }

      #terms {
        margin: 100px 0 15px 0;
      }
      #terms > div {
        min-height: 70px;
      }

      .payment-info {
        color: #707070;
        font-size: 12px;
      }
      .payment-info div {
        display: inline-block;
        min-width: 10px;
      }

      .ib_drop_zone {
        color: #F8ED31 !important;
        border-color: #F8ED31 
      }
    </style>
    
  </head>
  <body>
    <div id="container">
      <div class="invoice-top">
        <section id="memo">
          <div class="logo">
            <img src=${profile.logo} />
          </div>

          <div class="company-info">
            <span class="company-name">${profile.companyName}</span>

            <span class="spacer"></span>


            <div>${profile.address}</div>

            <span class="clearfix"></span>

            <div>${profile.phoneNo}</div>
            <div>${profile.email}</div>
          </div>
        </section>

        <section id="invoice-info">         

          <span class="clearfix"></span>

          <section id="invoice-title-number">
            <span id="title">${client.fullname}</span>
            <span id="number">${invoiceNumber}</span>
          </section>
        </section>

        <section id="client-info">
          <span>${client.company}</span>
          <div>
            <span class="bold">${client.fullname}</span>
          </div>

          <div>
            <span>${client.address}</span>
          </div>

          <div>
            <span>${client.city}</span>
          </div>

          <div>
            <span>${client.phoneNo}</span>
          </div>

          <div>
            <span>${client.email}</span>
          </div>
        </section>

        <div class="clearfix"></div>
      </div>

      <div class="clearfix"></div>

      <div class="invoice-body">
        <section id="items">
          <table cellpadding="0" cellspacing="0">
            <tr>
            <th></th>
            <!-- Dummy cell for the row number and row commands -->
            <th>ITEM</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>DISCOUNT</th>
            <th>TAX</th>
            <th>TOTAL</th>
          </tr>

          <tr data-iterate="item">

           ${items.map((currElement, index) => {
             return `
                 <td>${index + 1}</td>
            <!-- Don't remove this column as it's needed for the row commands -->
            <td>${currElement.description}</td>
            <td>${currElement.quantity}</td>
            <td>GHS ${currElement.price}</td>
            <td>${currElement.discount}</td>
            <td>${currElement.tax}</td>
            <td>GHS ${currElement.price * currElement.quantity}.00</td>
              </tr>`;
           })}
         
          </tr>
          </table>
        </section>

        <section id="sums">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <th>SUBTOTAL</th>
              <td>${subtotal}</td>
              <td></td>
            </tr>

            <tr data-iterate="tax">
              <th>TAX</th>
              <td>${tax}</td>
              <td></td>
            </tr>

            <tr class="amount-total">
              <th>TOTAL</th>
              <td>${total}</td>
              <td>
                <div class="currency">
                  <span>GHANA CEDIS</span> <span>GHS</span>
                </div>
              </td>
            </tr>
          </table>
        </section>

        <div class="clearfix"></div>

        <section id="terms">
               <div class="signature">
          <img src=${signature} />
        </div>
        <br />
          <span class="hidden">NOTES</span>
          <div>${notes}</div>
        </section>
      </div>
    </div>
  </body>
</html>

    `;
};

export const createHTML2 = ({
  businessName,
  email,
  client,
  profile,
  invoiceNumber,
  invoiceDate,
  items,
  subtotal,
  tax,
  total,
  notes,
  signature,
}) => {
  return `
      <!DOCTYPE html>
<!--
  Invoice template by invoicebus.com
  To customize this template consider following this guide https://invoicebus.com/how-to-create-invoice-template/
  This template is under Invoicebus Template License, see https://invoicebus.com/templates/license/
-->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Cobardia (firebrick)</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta name="description" content="Invoicebus Invoice Template" />
    <meta name="author" content="Invoicebus" />

    <meta name="template-hash" content="baadb45704803c2d1a1ac3e569b757d5" />
    <style>
      /*! Invoice Templates @author: Invoicebus @email: info@invoicebus.com @web: https://invoicebus.com @version: 1.0.0 @updated: 2015-02-27 16:02:34 @license: Invoicebus */
      /* Reset styles */
      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        font-size: 100%;
        vertical-align: baseline;
      }

      html {
        line-height: 1;
      }

      ol,
      ul {
        list-style: none;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      caption,
      th,
      td {
        text-align: left;
        font-weight: normal;
        vertical-align: middle;
      }

      q,
      blockquote {
        quotes: none;
      }
      q:before,
      q:after,
      blockquote:before,
      blockquote:after {
        content: "";
        content: none;
      }

      a img {
        border: none;
      }

      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      main,
      menu,
      nav,
      section,
      summary {
        display: block;
      }

      /* Invoice styles */
      /**
 * DON'T override any styles for the <html> and <body> tags, as this may break the layout.
 * Instead wrap everything in one main <div id="container"> element where you may change
 * something like the font or the background of the invoice
 */
      html,
      body {
        /* MOVE ALONG, NOTHING TO CHANGE HERE! */
      }

      /** 
 * IMPORTANT NOTICE: DON'T USE '!important' otherwise this may lead to broken print layout.
 * Some browsers may require '!important' in oder to work properly but be careful with it.
 */
      .clearfix {
        display: block;
        clear: both;
      }

      .hidden {
        display: none;
      }

      b,
      strong,
      .bold {
        font-weight: bold;
      }

      #container {
        font: normal 13px/1.4em "Open Sans", Sans-serif;
        margin: 0 auto;
        min-height: 1158px;
        background: #f7edeb url("../img/bg.png") 0 0 no-repeat;
        background-size: 100% auto;
        color: #5b6165;
        position: relative;
      }

      #memo {
        padding-top: 50px;
        margin: 0 110px 0 60px;
        border-bottom: 1px solid #ddd;
        height: 115px;
      }
      #memo .logo {
        float: left;
        margin-right: 20px;
      }
      #memo .logo img {
        width: 100px;
        height: 100px;
      }

      .signature img{
        width: 120px;
        heigth: 80px;
      }
      #memo .company-info {
        float: right;
        text-align: right;
      }
      #memo .company-info > div:first-child {
        line-height: 1em;
        font-weight: bold;
        font-size: 22px;
        color: #b32c39;
      }
      #memo .company-info span {
        font-size: 11px;
        display: inline-block;
        min-width: 20px;
      }
      #memo:after {
        content: "";
        display: block;
        clear: both;
      }

      #invoice-title-number {
        font-weight: bold;
        margin: 30px 0;
      }
      #invoice-title-number span {
        line-height: 0.88em;
        display: inline-block;
        min-width: 20px;
      }
      #invoice-title-number #title {
        text-transform: uppercase;
        padding: 0px 2px 0px 60px;
        font-size: 50px;
        background: #f4846f;
        color: white;
      }
      #invoice-title-number #number {
        margin-left: 10px;
        font-size: 35px;
        position: relative;
        top: -5px;
      }

      #client-info {
        float: left;
        margin-left: 60px;
        min-width: 220px;
      }
      #client-info > div {
        margin-bottom: 3px;
        min-width: 20px;
      }
      #client-info span {
        display: block;
        min-width: 20px;
      }
      #client-info > span {
        text-transform: uppercase;
      }

      table {
        table-layout: fixed;
      }
      table th,
      table td {
        vertical-align: top;
        word-break: keep-all;
        word-wrap: break-word;
      }
      .total{
          color: #000 !important;
      }
      #items {
        margin: 35px 30px 0 30px;
      }
      #items .first-cell,
      #items table th:first-child,
      #items table td:first-child {
        width: 40px !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        text-align: right;
      }
      #items table {
        border-collapse: separate;
        width: 100%;
      }
      #items table th {
        font-weight: bold;
        padding: 5px 8px;
        text-align: right;
        background: #b32c39;
        color: white;
        text-transform: uppercase;
      }
      #items table th:nth-child(2) {
        width: 30%;
        text-align: left;
      }
      #items table th:last-child {
        text-align: right;
      }
      #items table td {
        padding: 9px 8px;
        text-align: right;
        border-bottom: 1px solid #ddd;
      }
      #items table td:nth-child(2) {
        text-align: left;
      }

      #sums {
        margin: 25px 30px 0 0;
        background: url("../img/total-stripe-firebrick.png") right bottom
          no-repeat;
      }
      #sums table {
        float: right;
      }
      #sums table tr th,
      #sums table tr td {
        min-width: 100px;
        padding: 9px 8px;
        text-align: right;
      }
      #sums table tr th {
        font-weight: bold;
        text-align: left;
        padding-right: 35px;
      }
      #sums table tr td.last {
        min-width: 0 !important;
        max-width: 0 !important;
        width: 0 !important;
        padding: 0 !important;
        border: none !important;
      }
      #sums table tr.amount-total th {
        text-transform: uppercase;
        color: '#000';
      }
      #sums table tr.amount-total th,
      #sums table tr.amount-total td {
        font-size: 15px;
        font-weight: bold;
        color: '#000';
      }
      #sums table tr:last-child th {
        text-transform: uppercase;
      }
      #sums table tr:last-child th,
      #sums table tr:last-child td {
        font-size: 15px;
        font-weight: bold;
        color: white;
      }

      #invoice-info {
        float: left;
        margin: 50px 40px 0 60px;
      }
      #invoice-info > div > span {
        display: inline-block;
        min-width: 20px;
        min-height: 18px;
        margin-bottom: 3px;
      }
      #invoice-info > div > span:first-child {
        color: black;
      }
      #invoice-info > div > span:last-child {
        color: #aaa;
      }
      #invoice-info:after {
        content: "";
        display: block;
        clear: both;
      }

      #terms {
        float: left;
        margin-top: 50px;
      }
      #terms .notes {
        min-height: 30px;
        min-width: 50px;
        color: #b32c39;
      }
      #terms .payment-info div {
        margin-bottom: 3px;
        min-width: 20px;
      }

      .thank-you {
        margin: 10px 0 30px 0;
        display: inline-block;
        min-width: 20px;
        text-transform: uppercase;
        font-weight: bold;
        line-height: 0.88em;
        float: right;
        padding: 0px 30px 0px 2px;
        font-size: 50px;
        background: #f4846f;
        color: white;
      }

      .ib_bottom_row_commands {
        margin-left: 30px !important;
      }

      /**
 * If the printed invoice is not looking as expected you may tune up
 * the print styles (you can use !important to override styles)
 */
      @media print {
        /* Here goes your print styles */
      }
    </style>
  </head>
  <body>
    <div id="container">
      <section id="memo">
        <div class="logo">
          <img src=${profile.logo} />
        </div>

        <div class="company-info">
          <div>${profile.companyName}</div>

          <br />

          <span>${profile.address}</span>
          <br />

          <span>${profile.phoneNo}</span><br />
          <span>${profile.email}</span>
        </div>
      </section>

      <section id="invoice-title-number">
        <span id="title">#${invoiceNumber}</span>

      </section>

      <div class="clearfix"></div>

      <section id="client-info">
        <span>${client.company}</span>
        <div>
          <span class="bold">${client.fullname}</span>
        </div>

        <div>
          <span>${client.address}</span>
        </div>

        <div>
          <span>${client.city}</span>
        </div>

        <div>
          <span>${client.phoneNo}</span>
        </div>

        <div>
          <span>${client.email}</span>
        </div>

       
      </section>

      <div class="clearfix"></div>

      <section id="items">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <th></th>
            <!-- Dummy cell for the row number and row commands -->
            <th>ITEM</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>DISCOUNT</th>
            <th>TAX</th>
            <th>TOTAL</th>
          </tr>

          <tr data-iterate="item">

           ${items.map((currElement, index) => {
             return `
                 <td>${index + 1}</td>
            <!-- Don't remove this column as it's needed for the row commands -->
            <td>${currElement.description}</td>
            <td>${currElement.quantity}</td>
            <td>GHS ${currElement.price}</td>
            <td>${currElement.discount}</td>
            <td>${currElement.tax}</td>
            <td>GHS ${currElement.price * currElement.quantity}.00</td>
              </tr>`;
           })}
         
          </tr>
        </table>
      </section>

      <section id="sums">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <th>SUBTOTAL</th>
            <td>${subtotal}</td>
          </tr>

          <tr data-iterate="tax">
            <th>TAX</th>
            <td>${tax}</td>
          </tr>
          <tr data-iterate="tax">
            <th class='total'>TOTAL</th>
            <td class='total'>${total}</td>
          </tr>

          

         
        </table>

        <div class="clearfix"></div>
      </section>

      <div class="clearfix"></div>

      <section id="invoice-info">
        

     

        <div><span>GHS</span> <span>GHANA CEDIS</span></div>
           <br />
      <div class="signature">
          <img src=${signature} />
        </div>
        
        <br />

         <div class="notes">${notes}</div>
      </section>
      <br />

      <section id="terms">
      
       

        <br />

        <div class="payment-info">
          <div>${profile.mobileMoney}</div>
        </div>
      </section>

      <div class="clearfix"></div>

      <div class="thank-you">THANKS</div>

      <div class="clearfix"></div>
    </div>
  </body>
</html>

    `;
};

export const createHTML4 = ({
  businessName,
  email,
  client,
  profile,
  invoiceNumber,
  invoiceDate,
  items,
  subtotal,
  tax,
  total,
  notes,
  signature,
}) => {
  return `
  <!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Io (third)</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <style>
      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        font-size: 100%;
        vertical-align: baseline;
      }

      html {
        line-height: 1;
      }

      ol,
      ul {
        list-style: none;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      caption,
      th,
      td {
        text-align: left;
        font-weight: normal;
        vertical-align: middle;
      }

      q,
      blockquote {
        quotes: none;
      }
      q:before,
      q:after,
      blockquote:before,
      blockquote:after {
        content: "";
        content: none;
      }

      a img {
        border: none;
      }

      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      main,
      menu,
      nav,
      section,
      summary {
        display: block;
      }

      .clearfix {
        display: block;
        clear: both;
      }

      .hidden {
        display: none;
      }

      b,
      strong,
      .bold {
        font-weight: bold;
      }

      #container {
        font: normal 13px/1.4em "Open Sans", Sans-serif;
        margin: 0 auto;
        padding: 50px 40px;
        min-height: 1058px;
      }

      #memo .company-name {
        background: #8ba09e url("../img/arrows.png") 560px center no-repeat;
        background-size: 100px auto;
        padding: 10px 20px;
        position: relative;
        margin-bottom: 15px;
      }
      #memo .company-name span {
        color: white;
        display: inline-block;
        min-width: 20px;
        font-size: 36px;
        font-weight: bold;
        line-height: 1em;
      }
      #memo .company-name .right-arrow {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100px;
        background: url("../img/right-arrow.png") right center no-repeat;
        background-size: auto 60px;
      }
      #memo .logo {
        float: left;
        clear: left;
        margin-left: 20px;
      }
      #memo .logo img {
        width: 150px;
        height: 100px;
      }
      #memo .company-info {
        margin-left: 20px;
        float: left;
        font-size: 12px;
        color: #8b8b8b;
      }
      #memo .company-info div {
        margin-bottom: 3px;
        min-width: 20px;
      }
      #memo .company-info span {
        display: inline-block;
        min-width: 20px;
      }
      #memo:after {
        content: "";
        display: block;
        clear: both;
      }

      #invoice-info {
        float: left;
        margin: 25px 0 0 20px;
      }
      #invoice-info > div {
        float: left;
      }
      #invoice-info > div > span {
        display: block;
        min-width: 20px;
        min-height: 18px;
        margin-bottom: 3px;
      }
      #invoice-info > div:last-child {
        margin-left: 20px;
      }
      #invoice-info:after {
        content: "";
        display: block;
        clear: both;
      }

      #client-info {
        float: right;
        margin: 5px 20px 0 0;
        min-width: 220px;
        text-align: right;
      }
      #client-info > div {
        margin-bottom: 3px;
        min-width: 20px;
      }
      #client-info span {
        display: block;
        min-width: 20px;
      }

      #invoice-title-number {
        text-align: center;
        margin: 20px 0;
      }
      #invoice-title-number span {
        display: inline-block;
        min-width: 20px;
      }
      #invoice-title-number #title {
        margin-right: 15px;
        text-align: right;
        font-size: 20px;
        font-weight: bold;
      }
      #invoice-title-number #number {
        font-size: 15px;
        text-align: left;
      }

      table {
        table-layout: fixed;
      }
      table th,
      table td {
        vertical-align: top;
        word-break: keep-all;
        word-wrap: break-word;
      }

      #items {
        margin: 20px 0 35px 0;
      }
      #items .first-cell,
      #items table th:first-child,
      #items table td:first-child {
        width: 18px;
        text-align: right;
      }
      #items table {
        border-collapse: separate;
        width: 100%;
      }
      #items table th {
        padding: 12px 10px;
        text-align: right;
        background: #e6e7e7;
        border-bottom: 4px solid #487774;
      }
      #items table th:nth-child(2) {
        width: 30%;
        text-align: left;
      }
      #items table th:last-child {
        text-align: right;
        padding-right: 20px !important;
      }
      #items table td {
        padding: 15px 10px;
        text-align: right;
        border-right: 1px solid #cccccf;
      }
      #items table td:first-child {
        text-align: left;
        border-right: 0 !important;
      }
      #items table td:nth-child(2) {
        text-align: left;
      }
      #items table td:last-child {
        border-right: 0 !important;
        padding-right: 20px !important;
      }

      .currency {
        border-bottom: 4px solid #487774;
        padding: 0 20px;
      }
      .currency span {
        font-size: 11px;
        font-style: italic;
        color: #8b8b8b;
        display: inline-block;
        min-width: 20px;
      }

      #sums {
        float: right;
        background: #8ba09e url("../img/left-arrow.png") -17px bottom no-repeat;
        background-size: auto 100px;
        color: white;
      }
      #sums table tr th,
      #sums table tr td {
        min-width: 100px;
        padding: 8px 20px 8px 35px;
        text-align: right;
        font-weight: 600;
      }
      #sums table tr th {
        text-align: left;
        padding-right: 25px;
      }
      #sums table tr.amount-total th {
        text-transform: uppercase;
      }
      #sums table tr.amount-total th,
      #sums table tr.amount-total td {
        font-size: 16px;
        font-weight: bold;
      }
      #sums table tr:last-child th {
        text-transform: uppercase;
      }
      #sums table tr:last-child th,
      #sums table tr:last-child td {
        font-size: 16px;
        font-weight: bold;
        padding-top: 20px !important;
        padding-bottom: 40px !important;
      }

      #terms {
        margin: 50px 20px 10px 20px;
      }
      #terms > span {
        display: inline-block;
        min-width: 20px;
        font-weight: bold;
      }
      #terms > div {
        margin-top: 10px;
        min-height: 50px;
        min-width: 50px;
      }

      .payment-info {
        margin: 0 20px;
      }
      .payment-info div {
        font-size: 12px;
        color: #8b8b8b;
        display: inline-block;
        min-width: 20px;
      }

      .ib_bottom_row_commands {
        margin: 10px 0 0 20px !important;
      }

      .ibcl_tax_value:before {
        color: white !important;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <section id="memo">
        <div class="company-name">
          <span>${profile.companyName}</span>
          <div class="right-arrow"></div>
        </div>

        <div class="logo">
          <img src=${profile.logo} />
        </div>

        <div class="company-info">
          <div>
            <span>${profile.address}</span>
          </div>
          <div>${profile.email}</div>
          <div>${profile.phoneNo}</div>
        </div>
      </section>


      <section id="client-info">
        <span>Bill to:</span>
        <div>
          <span class="bold">${client.company}</span>
        </div>

        <div>
          <span>${client.address}</span>
        </div>

        <div>
          <span>${client.city}</span>
        </div>

        <div>
          <span>${client.phoneNo}</span>
        </div>

        <div>
          <span>${client.email}</span>
        </div>


      </section>

      <div class="clearfix"></div>

      <section id="invoice-title-number">
        <span id="title">Invoice No:</span>
        <span id="number">${invoiceNumber}</span>
      </section>

      <div class="clearfix"></div>

      <section id="items">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>

          <tr data-iterate="item">
            ${items.map((currElement, index) => {
              return `
                 <td>${index + 1}</td>
            <!-- Don't remove this column as it's needed for the row commands -->
            <td>${currElement.description}</td>
            <td>${currElement.quantity}</td>
            <td>GHS ${currElement.price}</td>
            <td>${currElement.discount}</td>
            <td>${currElement.tax}</td>
            <td>GHS ${currElement.price * currElement.quantity}.00</td>
            `;
            })}
          </tr>
        </table>
      </section>

  

      <section id="sums">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <th>Subtotal</th>
            <td>${subtotal}</td>
          </tr>

          <tr data-iterate="tax">
            <th>Tax</th>
            <td>${tax}</td>
          </tr>

          <tr class="amount-total">
            <th>Amount Total</th>
            <td>${total}</td>
          </tr>

         
        </table>
      </section>

      <div class="clearfix"></div>

      <section id="terms">
        <span>Terms</span>
        <div>${notes}</div>
      </section>

      
    </div>
  </body>
</html>

  `;
};
