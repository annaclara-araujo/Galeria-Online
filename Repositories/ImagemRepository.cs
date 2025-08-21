using GaleriaOnline.WebApi.DbContextImagem;
using GaleriaOnline.WebApi.Interfaces;
using GaleriaOnline.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GaleriaOnline.WebApi.Repositories
{
    public class ImagemRepository : IImagemRepository
    {
        private readonly GaleriaOnlineDbContext _context;

        //metodo construtor que recebe o contexto do banco de dados
        public ImagemRepository(GaleriaOnlineDbContext context)
        {
            _context = context;
        }

        //metodo para adicionar uma nova imagem ao banco de dados
        public async Task<Imagem?> CreateAsync(Imagem imagem)
        {
            _context.Imagens.Add(imagem);
            await _context.SaveChangesAsync();
            return imagem;
        }

        //metodo para excluir uma imagem do banco de dados
        public async Task<bool> DeleteAsync(int id)
        {
            var imagem = await _context.Imagens.FindAsync(id);
            if (imagem == null)
            {
                return false;
            }
            _context.Imagens.Remove(imagem);
            return await _context.SaveChangesAsync() > 0;
        }

        //metodo para obter(listar) todas as imagens do banco de dados
        public async Task<IEnumerable<Imagem>> GetAllAsync()
        {
            return await _context.Imagens.ToListAsync();
        }

        //metodo para obter uma imagem pelo id
        public async Task<Imagem?> GetByIdAsync(int id)
        {
            return await _context.Imagens.FindAsync(id);
        }

        //metodo para atualizar uma imagem no banco de dados
        public async Task<bool> UpdateAsync(Imagem imagem)
        {
            _context.Imagens.Update(imagem);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
