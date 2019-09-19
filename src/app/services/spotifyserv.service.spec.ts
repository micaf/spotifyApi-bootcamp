import { TestBed } from '@angular/core/testing';

import { SpotifyService} from './spotifyserv.service';

describe('SpotifyservService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyService = TestBed.get(SpotifyService);
    expect(service).toBeTruthy();
  });
});
