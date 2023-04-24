import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Agent {
  os: string;
  lastKeepAlive: string;
  dateAdd: string;
  ip: string;
  name: string;
  id: string;
  version: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  agents: Agent[] = [];
  totalAgents = 0;
  activeAgents = 0;
  disconnectedAgents = 0;
  pendingAgents = 0;
  neverConnectedAgents = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ results: Agent[] }>('../assets/agents.json')
      .subscribe(response => {
        // Filtrer l'agent avec l'ID 000 ou le nom cyr-customer-ossec.local
        this.agents = response.results.filter(agent => agent.id !== '000' && agent.name !== 'cyr-customer-ossec.local');
        this.totalAgents = this.agents.length;
        this.activeAgents = this.agents.filter(agent => agent.status === 'active').length;
        this.disconnectedAgents = this.agents.filter(agent => agent.status === 'disconnected').length;
        this.pendingAgents = this.agents.filter(agent => agent.status === 'pending').length;
        this.neverConnectedAgents = this.agents.filter(agent => agent.status === 'never_connected').length;
      });
  }
}
