package com.devsuperior.dspesquisa.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dspesquisa.dto.GameDTO;
import com.devsuperior.dspesquisa.entities.Game;
import com.devsuperior.dspesquisa.repositories.GameRepository;

@Service
public class GameService {

	private GameRepository gameRepository;
	
	public GameService(GameRepository gameRepository ) {
		this.gameRepository = gameRepository;
	}
	
	@Transactional(readOnly = true)
	public List<GameDTO> findAll(){
		List<Game> list = gameRepository.findAll();
		return list.stream().map(x -> new GameDTO(x))
				.collect(Collectors.toList());
	}
	
}
