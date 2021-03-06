package com.devsuperior.dspesquisa.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dspesquisa.dto.GameDTO;
import com.devsuperior.dspesquisa.services.GameService;

@RestController
@RequestMapping(value = "/games")
public class GameController {

	private GameService gameService;
	
	public GameController(GameService gameService) {
		this.gameService = gameService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<GameDTO>> findAll(){
		List<GameDTO> list = gameService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
}
