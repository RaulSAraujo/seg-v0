export interface Puppeteer {
  group_name: string;
  automations: Automation[];
}

export interface Automation {
  name_automation: string;
  description_automation: string;
  router_automation: string;
  type?: string;
  query?: Query;
  excel_route_param: string;
}


export interface Query {
  otp?: string;
  compressImagens?: boolean;
  nickname?: string;
  search?: string;
}

export interface Prompt {
  title: string;
  eventSource: EventSource | null;
  sseMessage: {
    message: string;
    timer: string;
  }[];
}

export interface newAutomation {
  automation: Automation;
  file: File;
  query: string;
}
