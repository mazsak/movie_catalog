package com.project.movie_catalog.service;

import com.project.movie_catalog.mapper.BasicMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@RequiredArgsConstructor
public class BasicServiceImpl<
        CLASS,
        CLASS_FORM,
        CLASS_REPO extends MongoRepository<CLASS, ID>,
        CLASS_MAPPER extends BasicMapper<CLASS, CLASS_FORM>,
        ID> implements BasicService<CLASS_FORM, ID> {

    protected final CLASS_REPO repo;
    protected final CLASS_MAPPER mapper;

    @Override
    public boolean save(final CLASS_FORM object) {
        repo.save(mapper.mapToEntity(object));
        return true;
    }

    @Override
    public CLASS_FORM saveAndReturn(final CLASS_FORM object) {
        return mapper.mapToDTO(repo.save(mapper.mapToEntity(object)));
    }

    @Override
    public List<CLASS_FORM> saveAndReturnList(final List<CLASS_FORM> objects) {
        return mapper.mapToDTOList(repo.saveAll(mapper.mapToEntityList(objects)));
    }

    @Override
    public CLASS_FORM findById(final ID id) {
        return mapper.mapToDTO(repo.findById(id).get());
    }

    @Override
    public void delete(final ID id) {
        repo.deleteById(id);
    }

    @Override
    public List<CLASS_FORM> findAll() {
        return mapper.mapToDTOList(repo.findAll());
    }

}
