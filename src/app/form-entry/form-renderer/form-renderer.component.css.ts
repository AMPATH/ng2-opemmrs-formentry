export const DEFAULT_STYLES = `a {
      color: white;
      text-decoration: none;
      font-size: 12px;
      text-transform: uppercase;
    }

    ul {
      list-style-type: none;
      margin: 2px auto;
      position: relative;
    }

    li {
      display: block;
      padding: 10px 20px;
      white-space: nowrap;
      transition: all 0.3s ease-in;
      border-bottom: 4px solid transparent;
    }

    li:hover {
      border-bottom: 4px solid white;
      opacity: 0.7;
      cursor: pointer;
    }

    .owl-theme .owl-controls .owl-nav {
      position: absolute;
      width: 100%;
      top: 0;
    }

    .owl-theme .owl-controls .owl-nav [class*="owl-"] {
      position: absolute;
      background: none;
      color: black;
    }

    .owl-theme .owl-controls .owl-nav [class*="owl-"]:hover {
      background: none;
      color: black;
    }

    .owl-theme .owl-controls .owl-nav .owl-next {
      right: 0;
      transform: translate(120%);
    }

    .owl-theme .owl-controls .owl-nav .owl-prev {
      left: 0;
      transform: translate(-120%);
    }

    .slick-initialized .swipe-tab-content {
      position: relative;
      min-height: 365px;
    }
    @media screen and (min-width: 767px) {
      .slick-initialized .swipe-tab-content {
        min-height: 500px;
      }
    }
    .slick-initialized .swipe-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: none;
      border: 0;
      color: #757575;
      cursor: pointer;
      text-align: center;
      border-bottom: 2px solid rgba(51, 122, 183, 0);
      transition: all 0.5s;
    }
    .slick-initialized .swipe-tab:hover {
      color: #337AB7;
    }
    .slick-initialized .swipe-tab.active-tab {
      border-bottom-color: #337AB7;
      color: #337AB7;
      font-weight: bold;
    }

    .disabled {
      opacity: .5;
      pointer-events: none;
    }

    .select2-container {
      margin-top: -5px;
    }

    .btn {
      padding: 0px 12px !important;
    }
    
    .appointments {
      margin-top:12px;
      font-size: 12px;
      color: #999;
    }
    
    .appointments p {
      padding-top: 12px;
    }
    
    .appointments th {
      border-bottom: 0 !important;
      color: #333;
    }
    
    .appointments td span, .appointments th span {
      display: block;
    }
    
    .appointments td.active, .appointments th.active {
      background-color: #3c8dbc;
      color:#fff !important;
      padding:0;
    }
    
    .appointments td.active span, .appointments th.active span {
      padding:4px;
    }
    
    .appointments span.fa {
      display: inline-block;
      margin-right: 7px;
    }

    ng-select.form-control {
      padding-top: 0;
      height: auto;
      padding-bottom: 0;
    }`;
